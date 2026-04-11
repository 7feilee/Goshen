/**
 * German citizenship test (Einbürgerungstest) engine.
 *
 * Builds question sets for two modes:
 *  - Mock test : 30 random general questions + 3 random state-specific questions
 *  - Practice  : full question bank filtered by category (or all)
 *
 * All 300 general questions and 160 state-specific questions are bundled at
 * build time as static JSON — no server or API required.
 */

import type { CitizenshipQuestion, GermanState, FilterCategory } from '@/types'
import generalData from '../../../content/citizenship/DE/general.json'
import statesData from '../../../content/citizenship/DE/states.json'

// ── Types ─────────────────────────────────────────────────────────────────────

interface StateRecord {
  code: string
  capital: string
  questions: CitizenshipQuestion[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const GENERAL: CitizenshipQuestion[] = generalData as CitizenshipQuestion[]

const STATES: Record<string, StateRecord> = statesData as unknown as Record<string, StateRecord>

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

export const GERMAN_STATES: GermanState[] = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
]

export const CATEGORY_LABELS: Record<string, string> = {
  all:          'All questions',
  Demokratie:   'Democracy & constitution',
  Grundrechte:  'Fundamental rights',
  Geschichte:   'History',
  Gesellschaft: 'Society & culture',
  Staat:        'State & politics',
  state:        'State-specific questions',
}

/** Official mock exam: 30 random general + 3 random state questions, shuffled. */
export function buildMockTest(state: GermanState): CitizenshipQuestion[] {
  const stateRecord = STATES[state]
  const stateQs = stateRecord ? pick(stateRecord.questions, 3) : []
  const general  = pick(GENERAL, 30)
  return shuffle([...general, ...stateQs])
}

/**
 * Practice set filtered by category.
 * 'all' returns all general + all state questions for the chosen state.
 * 'state' returns only state-specific questions.
 * Any other category filters the general question bank.
 */
export function buildPracticeSet(
  category: FilterCategory,
  state: GermanState,
): CitizenshipQuestion[] {
  if (category === 'all') {
    const stateRecord = STATES[state]
    const stateQs = stateRecord ? stateRecord.questions : []
    return [...GENERAL, ...stateQs]
  }
  if (category === 'state') {
    const stateRecord = STATES[state]
    return stateRecord ? [...stateRecord.questions] : []
  }
  return GENERAL.filter((q) => q.category === category)
}

/** Total question counts for display. */
export const QUESTION_COUNTS = {
  general: GENERAL.length,
  statesPer: 10,
  mockTotal: 33,
  mockPass: 17,
}
