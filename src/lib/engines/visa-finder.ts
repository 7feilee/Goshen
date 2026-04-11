/**
 * Client-side visa matching engine.
 *
 * All matching runs in the browser using static JSON data bundled at build
 * time — no server, no API key required.
 *
 * Scoring model (additive):
 *   +10   category match (primary signal)
 *   +4    job offer present AND visa is a work visa
 *   +5    has family AND visa is a family visa
 *   +1–4  years of experience (capped, work/business/investor categories)
 *   +1–4  current immigration status context (see scoreStatus)
 *   +1    visa leads to permanent residency or citizenship
 *   +0.5  no annual cap (better odds of approval)
 *
 * Match quality bands (with category match):
 *   strong  ≥ 17 pts
 *   good    ≥ 13 pts
 *   possible < 13 pts
 * Without category match: possible ≥ 8, else weak.
 */

import type { VisaFinderInput } from '@/types'
import usData from '../../../content/countries/US/data.json'
import deData from '../../../content/countries/DE/data.json'
import ukData from '../../../content/countries/UK/data.json'
import caData from '../../../content/countries/CA/data.json'
import auData from '../../../content/countries/AU/data.json'

// ── Internal types ────────────────────────────────────────────────────────────

interface VisaRecord {
  id: string
  name: string
  category: string
  description: string
  requirements: string[]
  processingTime: string
  fee: string
  maxDuration: string
  leadsTo: string | null
  annualCap: number | null
  source: string
}

interface CountryRecord {
  code: string
  name: string
  flag: string
  officialImmigrationWebsite: string
  lastVerified: string
  visas: VisaRecord[]
}

// ── Public types ──────────────────────────────────────────────────────────────

export type MatchQuality = 'strong' | 'good' | 'possible' | 'weak'

export interface VisaMatch {
  visa: VisaRecord
  score: number
  quality: MatchQuality
  categoryMatch: boolean
}

export interface CountryMeta {
  code: string
  name: string
  flag: string
  officialImmigrationWebsite: string
  lastVerified: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const COUNTRY_DATA: Record<string, CountryRecord> = {
  US: usData as CountryRecord,
  DE: deData as CountryRecord,
  UK: ukData as CountryRecord,
  CA: caData as CountryRecord,
  AU: auData as CountryRecord,
}

// ── Scoring helpers ───────────────────────────────────────────────────────────

/**
 * Boost/penalise based on the user's declared current immigration status.
 * Uses regex keyword matching — tolerates typos and common abbreviations.
 */
function scoreStatus(visa: VisaRecord, currentStatus: string): number {
  if (!currentStatus.trim()) return 0
  const s = currentStatus.toLowerCase()
  let bonus = 0

  // Student / study status → study continuation or post-study work
  if (/\bstudent\b|\bstudy\b|\bf-?1\b|\bt-?4\b|\bstudying\b/.test(s)) {
    if (visa.category === 'study') bonus += 2
    if (visa.category === 'work') bonus += 1   // post-study work permit
  }

  // Undocumented / no legal status → asylum is the primary pathway
  if (/\bundocumented\b|\birregular\b|\bno\s+status\b|\bno\s+visa\b/.test(s)) {
    if (visa.category === 'asylum') bonus += 4
  }

  // Tourist / visitor → harder to convert to work; asylum still available
  if (/\btourist\b|\bvisitor\b|\bb-?[12]\b|\bvisit\b/.test(s)) {
    if (visa.category === 'work') bonus -= 1
    if (visa.category === 'asylum') bonus += 1
  }

  // Already on a work visa → likely looking to extend or transition to PR
  if (/\bwork(?:ing)?\s*(?:visa|permit)\b|\bh-?1\b|\btss\b|\b482\b|\bskilled\s+worker\b/.test(s)) {
    const lt = (visa.leadsTo ?? '').toLowerCase()
    if (lt.includes('permanent') || lt.includes(' pr') || lt.includes('green card')) {
      bonus += 2
    }
  }

  return bonus
}

function scoreVisa(visa: VisaRecord, input: VisaFinderInput): number {
  let score = 0

  // Primary signal: category match
  if (visa.category === input.purpose) score += 10

  // Job offer: strong work signal, not relevant for investor
  if (input.hasJobOffer) {
    if (visa.category === 'work') score += 4
    else if (visa.category === 'investor') score += 1
  }

  // Family connection: direct signal for family visas
  if (input.hasFamily && visa.category === 'family') score += 5

  // Work experience: relevant for skilled-worker tracks
  if (input.yearsExperience && input.yearsExperience > 0) {
    const relevant =
      visa.category === 'work' ||
      visa.category === 'business' ||
      visa.category === 'investor'
    if (relevant) {
      score += Math.min(Math.floor(input.yearsExperience / 2), 4)
    }
  }

  // Current status context
  score += scoreStatus(visa, input.currentStatus)

  // PR/citizenship pathway — universally desirable
  const leadsToLower = (visa.leadsTo ?? '').toLowerCase()
  if (
    leadsToLower.includes('permanent') ||
    leadsToLower.includes('citizenship') ||
    leadsToLower.includes('green card') ||
    leadsToLower.includes(' pr')
  ) {
    score += 1
  }

  // Uncapped: better odds of obtaining the visa
  if (visa.annualCap === null) score += 0.5

  return score
}

function toMatchQuality(score: number, categoryMatch: boolean): MatchQuality {
  if (!categoryMatch) {
    return score >= 8 ? 'possible' : 'weak'
  }
  // Category matched — base score is already 10
  if (score >= 17) return 'strong'
  if (score >= 13) return 'good'
  return 'possible'
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns the top matching visas for the given input, sorted by relevance.
 * Prefers exact category matches; falls back to best-scored options when none
 * exist. Returns at most 5 results.
 */
export function findVisaMatches(input: VisaFinderInput): VisaMatch[] {
  const data = COUNTRY_DATA[input.destinationCountry]
  if (!data) return []

  const scored = data.visas
    .map((v) => {
      const score = scoreVisa(v, input)
      const categoryMatch = v.category === input.purpose
      return { visa: v, score, categoryMatch, quality: toMatchQuality(score, categoryMatch) }
    })
    .sort((a, b) => b.score - a.score)

  const categoryMatches = scored.filter((s) => s.categoryMatch)
  return (categoryMatches.length > 0 ? categoryMatches : scored).slice(0, 5)
}

/** Returns lightweight country metadata for display in result footers. */
export function getCountryMeta(code: string): CountryMeta | null {
  const data = COUNTRY_DATA[code]
  if (!data) return null
  return {
    code: data.code,
    name: data.name,
    flag: data.flag,
    officialImmigrationWebsite: data.officialImmigrationWebsite,
    lastVerified: data.lastVerified,
  }
}
