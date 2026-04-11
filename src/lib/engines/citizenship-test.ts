/**
 * Multi-country citizenship test engine.
 *
 * Builds question sets for two modes:
 *  - Mock test : random selection matching the official exam format
 *  - Practice  : full question bank filtered by category
 *
 * Supported countries: US, DE, UK, CA, AU
 * All question banks are bundled at build time as static JSON — no server required.
 */

import type { CitizenshipQuestion, GermanState, FilterCategory } from '@/types'

// Static JSON imports — bundled at build time
import usGeneral    from '../../../content/citizenship/US/general.json'
import deGeneral    from '../../../content/citizenship/DE/general.json'
import deStates     from '../../../content/citizenship/DE/states.json'
import ukGeneral    from '../../../content/citizenship/UK/general.json'
import caGeneral    from '../../../content/citizenship/CA/general.json'
import auGeneral    from '../../../content/citizenship/AU/general.json'

// ── Types ─────────────────────────────────────────────────────────────────────

export type CitizenshipCountry = 'US' | 'DE' | 'UK' | 'CA' | 'AU'

export interface CountryTestConfig {
  flag: string
  name: string
  testName: string
  totalQuestions: number
  mockCount: number       // questions per mock exam
  passCount: number       // minimum correct to pass
  timeMinutes: number
  categories: string[]    // filter categories for practice mode
  categoryLabels: Record<string, string>
  hasStateVariant: boolean
  sourceNote: string
  officialUrl: string
}

interface StateRecord {
  code: string
  capital: string
  questions: CitizenshipQuestion[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const QUESTIONS: Record<CitizenshipCountry, CitizenshipQuestion[]> = {
  US: usGeneral as CitizenshipQuestion[],
  DE: deGeneral as CitizenshipQuestion[],
  UK: ukGeneral as CitizenshipQuestion[],
  CA: caGeneral as CitizenshipQuestion[],
  AU: auGeneral as CitizenshipQuestion[],
}

const DE_STATES: Record<string, StateRecord> = deStates as unknown as Record<string, StateRecord>

// ── Config per country ────────────────────────────────────────────────────────

export const COUNTRY_CONFIGS: Record<CitizenshipCountry, CountryTestConfig> = {
  US: {
    flag: '🇺🇸',
    name: 'United States',
    testName: 'USCIS Civics Test',
    totalQuestions: 100,
    mockCount: 10,
    passCount: 6,
    timeMinutes: 10,
    categories: ['all', 'principles', 'government', 'rights', 'history', 'geography'],
    categoryLabels: {
      all:        'All 100 questions',
      principles: 'Principles of Democracy',
      government: 'System of Government',
      rights:     'Rights & Responsibilities',
      history:    'American History',
      geography:  'Geography, Symbols & Holidays',
    },
    hasStateVariant: false,
    sourceNote: 'Questions based on the official USCIS 100 civics questions (public domain).',
    officialUrl: 'https://www.uscis.gov/citizenship/find-study-materials-and-resources',
  },
  DE: {
    flag: '🇩🇪',
    name: 'Germany',
    testName: 'Einbürgerungstest',
    totalQuestions: 310,
    mockCount: 33,
    passCount: 17,
    timeMinutes: 60,
    categories: ['all', 'Demokratie', 'Grundrechte', 'Geschichte', 'Gesellschaft', 'Staat', 'state'],
    categoryLabels: {
      all:          'All questions',
      Demokratie:   'Democracy & constitution',
      Grundrechte:  'Fundamental rights',
      Geschichte:   'History',
      Gesellschaft: 'Society & culture',
      Staat:        'State & politics',
      state:        'State-specific questions',
    },
    hasStateVariant: true,
    sourceNote: '310 questions — 300 general + 10 state-specific per Bundesland. Questions in German.',
    officialUrl: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/Einbuergerungstest/einbuergerungstest-node.html',
  },
  UK: {
    flag: '🇬🇧',
    name: 'United Kingdom',
    testName: 'Life in the UK Test',
    totalQuestions: 50,
    mockCount: 24,
    passCount: 18,
    timeMinutes: 45,
    categories: ['all', 'history', 'government', 'society', 'values'],
    categoryLabels: {
      all:        'All 50 questions',
      history:    'British History',
      government: 'Government & Law',
      society:    'British Society',
      values:     'Values & Freedoms',
    },
    hasStateVariant: false,
    sourceNote: 'Based on "Life in the United Kingdom: A Guide for New Residents" handbook.',
    officialUrl: 'https://www.gov.uk/life-in-the-uk-test',
  },
  CA: {
    flag: '🇨🇦',
    name: 'Canada',
    testName: 'Canadian Citizenship Test',
    totalQuestions: 50,
    mockCount: 20,
    passCount: 15,
    timeMinutes: 30,
    categories: ['all', 'history', 'government', 'rights', 'geography', 'symbols'],
    categoryLabels: {
      all:        'All 50 questions',
      history:    'Canadian History',
      government: 'Government & Democracy',
      rights:     'Rights & Responsibilities',
      geography:  'Geography & Economy',
      symbols:    'Symbols & Culture',
    },
    hasStateVariant: false,
    sourceNote: 'Based on "Discover Canada: The Rights and Responsibilities of Citizenship".',
    officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html',
  },
  AU: {
    flag: '🇦🇺',
    name: 'Australia',
    testName: 'Australian Citizenship Test',
    totalQuestions: 50,
    mockCount: 20,
    passCount: 15,
    timeMinutes: 45,
    categories: ['all', 'history', 'government', 'values', 'geography', 'symbols'],
    categoryLabels: {
      all:       'All 50 questions',
      history:   'Australian History',
      government:'Government & Constitution',
      values:    'Australian Values',
      geography: 'Geography',
      symbols:   'Symbols & Culture',
    },
    hasStateVariant: false,
    sourceNote: 'Based on "Australian Citizenship: Our Common Bond" resource booklet.',
    officialUrl: 'https://immi.homeaffairs.gov.au/citizenship/test-and-interview/prepare-for-the-test',
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Build a mock test for the given country.
 * For DE: 30 random general + 3 random state-specific questions.
 * For others: random selection of mockCount questions from the full bank.
 */
export function buildMockTest(
  country: CitizenshipCountry,
  state?: GermanState,
): CitizenshipQuestion[] {
  if (country === 'DE') {
    const stateRecord = state ? DE_STATES[state] : null
    const stateQs = stateRecord ? pick(stateRecord.questions, 3) : []
    const general  = pick(QUESTIONS.DE, 30)
    return shuffle([...general, ...stateQs])
  }
  const cfg = COUNTRY_CONFIGS[country]
  return pick(QUESTIONS[country], cfg.mockCount)
}

/**
 * Practice set filtered by category.
 * 'all' returns the entire question bank for that country.
 * For DE 'state': returns only state-specific questions.
 * Any other category filters by question.category.
 */
export function buildPracticeSet(
  country: CitizenshipCountry,
  category: string,
  state?: GermanState,
): CitizenshipQuestion[] {
  if (country === 'DE') {
    if (category === 'all') {
      const stateRecord = state ? DE_STATES[state] : null
      const stateQs = stateRecord ? stateRecord.questions : []
      return [...QUESTIONS.DE, ...stateQs]
    }
    if (category === 'state') {
      const stateRecord = state ? DE_STATES[state] : null
      return stateRecord ? [...stateRecord.questions] : []
    }
    return QUESTIONS.DE.filter((q) => q.category === category)
  }

  if (category === 'all') return QUESTIONS[country]
  return QUESTIONS[country].filter((q) => q.category === category)
}

// ── Legacy DE-only exports (backward compat) ─────────────────────────────────

export const GERMAN_STATES: GermanState[] = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg',
  'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern',
  'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz',
  'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen',
]

/** @deprecated use COUNTRY_CONFIGS['DE'].categoryLabels */
export const CATEGORY_LABELS: Record<string, string> =
  COUNTRY_CONFIGS.DE.categoryLabels

/** @deprecated use COUNTRY_CONFIGS['DE'] */
export const QUESTION_COUNTS = {
  general:   QUESTIONS.DE.length,
  statesPer: 10,
  mockTotal: COUNTRY_CONFIGS.DE.mockCount,
  mockPass:  COUNTRY_CONFIGS.DE.passCount,
}

export const CITIZENSHIP_COUNTRIES: CitizenshipCountry[] = ['US', 'DE', 'UK', 'CA', 'AU']
