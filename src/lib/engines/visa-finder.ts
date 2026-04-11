/**
 * Client-side visa matching engine.
 *
 * Replaces the former Claude API integration. All matching runs in the browser
 * using static JSON data bundled at build time — no server, no API key.
 */

import type { VisaFinderInput, VisaCategory } from '@/types'
import usData from '../../../content/countries/US/data.json'
import deData from '../../../content/countries/DE/data.json'
import ukData from '../../../content/countries/UK/data.json'
import caData from '../../../content/countries/CA/data.json'
import auData from '../../../content/countries/AU/data.json'

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

const COUNTRY_DATA: Record<string, CountryRecord> = {
  US: usData as CountryRecord,
  DE: deData as CountryRecord,
  UK: ukData as CountryRecord,
  CA: caData as CountryRecord,
  AU: auData as CountryRecord,
}

const PURPOSE_LABELS: Record<VisaCategory, string> = {
  work: 'work / employment',
  study: 'study',
  family: 'joining family',
  asylum: 'asylum / refugee protection',
  business: 'starting a business',
  working_holiday: 'a working holiday',
  investor: 'investment',
}

function scoreVisa(visa: VisaRecord, input: VisaFinderInput): number {
  let score = 0

  // Primary signal: category match
  if (visa.category === input.purpose) score += 10

  // Qualifier boosts
  if (input.hasJobOffer && (visa.category === 'work' || visa.category === 'investor')) {
    score += 3
  }
  if (input.hasFamily && visa.category === 'family') {
    score += 5
  }
  if (input.yearsExperience && input.yearsExperience > 0 && visa.category === 'work') {
    score += Math.min(Math.floor(input.yearsExperience / 2), 3)
  }

  // Bonus: leads to permanent residency / citizenship
  const leadsToLower = (visa.leadsTo ?? '').toLowerCase()
  if (
    leadsToLower.includes('permanent') ||
    leadsToLower.includes('citizenship') ||
    leadsToLower.includes('green card') ||
    leadsToLower.includes(' pr')
  ) {
    score += 1
  }

  // Bonus: uncapped
  if (visa.annualCap === null) score += 0.5

  return score
}

function formatVisaCard(visa: VisaRecord, rank: number): string {
  const lines: string[] = []

  lines.push(`${rank}. ${visa.name}`)
  lines.push(``)
  lines.push(`   ${visa.description}`)
  lines.push(``)
  lines.push(`   Requirements:`)
  visa.requirements.forEach((r) => lines.push(`   • ${r}`))
  lines.push(``)
  lines.push(`   Processing time : ${visa.processingTime}`)
  lines.push(`   Government fee  : ${visa.fee}`)
  lines.push(`   Duration        : ${visa.maxDuration}`)
  if (visa.leadsTo) {
    lines.push(`   Pathway to PR   : ${visa.leadsTo}`)
  }
  if (visa.annualCap) {
    lines.push(`   Annual cap      : ${visa.annualCap.toLocaleString()} places (competitive lottery/draw)`)
  }
  lines.push(`   Official info   : ${visa.source}`)

  return lines.join('\n')
}

export function findVisaOptions(input: VisaFinderInput): string {
  const data = COUNTRY_DATA[input.destinationCountry]

  if (!data) {
    return [
      `No visa data available for ${input.destinationCountry} yet.`,
      ``,
      `Visit the official immigration website for this country to explore your options directly.`,
    ].join('\n')
  }

  const purposeLabel = PURPOSE_LABELS[input.purpose] ?? input.purpose

  // Score all visas
  const scored = data.visas
    .map((v) => ({ visa: v, score: scoreVisa(v, input) }))
    .sort((a, b) => b.score - a.score)

  // Prefer category matches; fall back to top-scored if no matches
  const categoryMatches = scored.filter((s) => s.visa.category === input.purpose)
  const toShow = (categoryMatches.length > 0 ? categoryMatches : scored).slice(0, 5)

  const lines: string[] = []

  // Header
  lines.push(
    `Visa options for ${input.originCountry} → ${data.flag} ${data.name}  (${purposeLabel})`,
  )

  const context: string[] = []
  if (input.hasJobOffer) context.push('job offer in hand')
  if (input.hasFamily) context.push('family already there')
  if (input.yearsExperience) context.push(`${input.yearsExperience} yrs experience`)
  if (context.length > 0) lines.push(`Your situation: ${context.join(' · ')}`)

  lines.push('')

  if (toShow.length === 0) {
    lines.push(`No visa options found for "${purposeLabel}" in ${data.name}.`)
    lines.push(``)
    lines.push(
      `Visit ${data.officialImmigrationWebsite} to explore all available visa categories.`,
    )
    return lines.join('\n')
  }

  toShow.forEach(({ visa }, i) => {
    lines.push(formatVisaCard(visa, i + 1))
    lines.push('')
  })

  lines.push('─'.repeat(55))
  lines.push(`Official immigration site : ${data.officialImmigrationWebsite}`)
  lines.push(`Visa data last verified   : ${data.lastVerified}`)

  return lines.join('\n')
}
