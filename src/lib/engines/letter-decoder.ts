/**
 * Client-side letter analysis engine.
 *
 * Replaces the former Claude API integration. Extracts structured facts from
 * official letters using regex and keyword matching — runs entirely in the
 * browser with no server, no API key, and no data leaving the device.
 */

import type { LetterDecodeInput } from '@/types'

// ─── Extraction patterns ────────────────────────────────────────────────────

const DATE_PATTERNS: RegExp[] = [
  // "14 March 2025" / "4 Jan 2025"
  /\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/gi,
  // "March 14, 2025" / "March 14 2025"
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}\b/gi,
  // ISO: "2025-03-14"
  /\b\d{4}-\d{2}-\d{2}\b/g,
  // "03/14/2025" or "14/03/2025"
  /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}\b/g,
]

const AMOUNT_RE =
  /(?:[$€£¥₹A][\s]?[\d,]+(?:\.\d{1,2})?|[\d,]+(?:\.\d{1,2})?\s*(?:USD|EUR|GBP|CAD|AUD|INR|NZD|CHF))\b/gi

const REFERENCE_PATTERNS: RegExp[] = [
  /(?:reference|ref\.?|case\s*(?:no\.?|number|#)?|application\s*(?:no\.?|number|id)?|claim\s*(?:no\.?|number)?|file\s*(?:no\.?|number)?|tracking\s*(?:no\.?|number)?|docket|matter\s*no\.?|ticket\s*(?:no\.?|number)?)\s*[:#]?\s*([A-Z0-9][-A-Z0-9\/]{3,30})/gi,
  // Standalone reference-looking codes (2–4 uppercase letters + digits + separators)
  /\b([A-Z]{2,4}[-\/][0-9]{4,12}(?:[-\/][A-Z0-9]+)?)\b/g,
]

const URL_RE = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi

// ─── Letter type classification ──────────────────────────────────────────────

const LETTER_TYPES: Record<string, string[]> = {
  'Visa / Immigration Decision': [
    'visa', 'application', 'approved', 'refused', 'denied', 'immigration',
    'USCIS', 'UKVI', 'IRCC', 'home affairs', 'BAMF', 'I-797', 'I-130',
    'leave to remain', 'residence permit', 'permanent resident', 'biometric',
    'naturalisation', 'naturalization', 'citizenship', 'asylum', 'refugee',
    'deportation', 'removal', 'status', 'endorsement',
  ],
  'Tax Notice': [
    'tax', 'IRS', 'HMRC', 'CRA', 'revenue', 'filing', 'return', 'assessment',
    'refund', 'deductions', 'taxpayer', 'fiscal', 'FATCA', 'W-2', 'T4',
    'self-assessment', 'VAT', 'customs', 'penalty', 'underpayment',
  ],
  'Court / Legal Notice': [
    'court', 'hearing', 'subpoena', 'summons', 'judgment', 'plaintiff',
    'defendant', 'attorney', 'counsel', 'lawsuit', 'appeal', 'tribunal',
    'magistrate', 'judge', 'verdict', 'injunction', 'order', 'contempt',
  ],
  'Benefits / Welfare': [
    'benefit', 'allowance', 'claim', 'entitlement', 'welfare', 'social security',
    'universal credit', 'jobseeker', 'disability', 'pension', 'medicare',
    'medicaid', 'SNAP', 'housing benefit', 'child benefit', 'tax credit',
  ],
  'Employment / Work Permit': [
    'employer', 'employment', 'work permit', 'labour', 'labor', 'wage', 'salary',
    'termination', 'redundancy', 'dismissal', 'probation', 'payroll', 'union',
    'workers compensation', 'unfair dismissal',
  ],
  'Housing / Tenancy': [
    'tenancy', 'lease', 'rent', 'eviction', 'landlord', 'tenant', 'property',
    'deposit', 'possession', 'notice to quit', 'mortgage', 'council', 'repair',
    'housing association', 'utility',
  ],
  'Health / Medical': [
    'medical', 'health', 'hospital', 'prescription', 'appointment', 'clinic',
    'doctor', 'treatment', 'diagnosis', 'NHS', 'medicare', 'coverage',
    'referral', 'specialist', 'insurance premium',
  ],
  'Financial / Banking': [
    'account', 'statement', 'bank', 'transaction', 'payment', 'debt',
    'collection', 'balance', 'credit', 'loan', 'overdraft', 'fraud',
    'AML', 'KYC', 'interest', 'direct debit',
  ],
  'Education': [
    'school', 'university', 'college', 'enrolment', 'admission', 'scholarship',
    'tuition', 'student', 'academic', 'graduation', 'degree', 'transcript',
    'GPA', 'financial aid',
  ],
}

// ─── Urgency ─────────────────────────────────────────────────────────────────

const HIGH_URGENCY_PHRASES = [
  'immediately', 'urgent', 'final notice', 'final warning',
  'action required', 'within 7 days', 'within one week',
  'by return', 'without delay', 'failure to respond',
  'deportation', 'removal order', 'warrant', 'arrest',
  'comply immediately', 'legal action will', 'court date',
]

const MEDIUM_URGENCY_PHRASES = [
  'please respond', 'required action', 'within 30 days', 'within one month',
  'within 28 days', 'within 21 days', 'respond by', 'reply by',
  'action needed', 'deadline', 'must be received',
]

// ─── Action suggestions per letter type ──────────────────────────────────────

const TYPE_ACTIONS: Record<string, string[]> = {
  'Visa / Immigration Decision': [
    'Note all reference and case numbers from the letter',
    'Check whether there is a right of appeal and when the deadline is',
    'If approved: follow the instructions to activate or collect your visa/permit',
    'If refused: consult an immigration lawyer before filing an appeal',
    'Visit the official immigration website for next steps',
  ],
  'Tax Notice': [
    'Compare the amounts stated with your own records',
    'Contact the tax authority if you disagree with the assessment',
    'File any response or payment by the stated deadline to avoid penalties',
    'Consider consulting an accountant or tax adviser',
  ],
  'Court / Legal Notice': [
    'Do NOT ignore this — respond or attend as required',
    'Note the date, time, and location of any hearing',
    'Consult a lawyer as soon as possible',
    'Gather any documents or evidence mentioned in the letter',
  ],
  'Benefits / Welfare': [
    'Check whether this is a decision, request for information, or change notice',
    'If you disagree with a decision, note the appeal deadline',
    'Gather documents if they are requesting proof of your circumstances',
    'Contact the benefits authority if anything is unclear',
  ],
  'Employment / Work Permit': [
    'Check whether this affects your right to work',
    'Review your employment contract alongside this letter',
    'Consult your employer or HR department',
    'Seek legal advice if the letter concerns termination or a dispute',
  ],
  'Housing / Tenancy': [
    'Note any deadlines for payment, moving out, or responding',
    'Contact your landlord or housing association if there is a dispute',
    'Seek housing advice or legal aid if you are facing eviction',
  ],
}

const DEFAULT_ACTIONS = [
  'Read the letter carefully and note all deadlines and reference numbers',
  'Gather any documents or information requested',
  'Respond by the stated deadline',
  'Keep a copy of this letter and any response you send',
  'If the contents are unclear, seek advice from a relevant professional or community organisation',
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractDates(text: string): string[] {
  const found = new Set<string>()
  for (const re of DATE_PATTERNS) {
    for (const m of text.matchAll(re)) {
      found.add(m[0].trim())
    }
  }
  return [...found].slice(0, 8)
}

function extractAmounts(text: string): string[] {
  const matches = [...text.matchAll(AMOUNT_RE)].map((m) => m[0].trim())
  return [...new Set(matches)].slice(0, 5)
}

function extractReferences(text: string): string[] {
  const found = new Set<string>()
  for (const re of REFERENCE_PATTERNS) {
    for (const m of text.matchAll(re)) {
      const ref = (m[1] ?? m[0]).trim()
      if (ref.length >= 4 && ref.length <= 32) found.add(ref)
    }
  }
  return [...found].slice(0, 4)
}

function extractUrls(text: string): string[] {
  const matches = [...text.matchAll(URL_RE)].map((m) => m[0])
  return [...new Set(matches)].slice(0, 3)
}

function classifyLetter(text: string): string {
  const lower = text.toLowerCase()
  let bestType = 'Official / Government Notice'
  let bestScore = 0

  for (const [type, keywords] of Object.entries(LETTER_TYPES)) {
    const score = keywords.filter((k) => lower.includes(k.toLowerCase())).length
    if (score > bestScore) {
      bestScore = score
      bestType = type
    }
  }
  return bestType
}

function assessUrgency(text: string): { indicator: string; label: string } {
  const lower = text.toLowerCase()
  if (HIGH_URGENCY_PHRASES.some((p) => lower.includes(p))) {
    return { indicator: '🔴', label: 'Urgent — action likely needed within 7 days' }
  }
  if (MEDIUM_URGENCY_PHRASES.some((p) => lower.includes(p))) {
    return { indicator: '🟡', label: 'Action required — check deadlines below' }
  }
  return { indicator: '🟢', label: 'Informational — review at your convenience' }
}

function getActions(letterType: string, text: string): string[] {
  const base = TYPE_ACTIONS[letterType] ?? DEFAULT_ACTIONS
  const extra: string[] = []
  const lower = text.toLowerCase()

  if ((lower.includes('appeal') || lower.includes('review')) && !base.some((a) => a.includes('appeal'))) {
    extra.push('You may have the right to appeal — check the deadline carefully')
  }
  if (lower.includes('payment') || lower.includes('fee due')) {
    extra.push('Ensure any required payment is made before the deadline')
  }

  return [...base, ...extra].slice(0, 5)
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function decodeLetter(input: LetterDecodeInput): string {
  const { text, country, targetLocale } = input

  if (!text.trim()) {
    return 'Please paste the letter text to decode it.'
  }

  const dates = extractDates(text)
  const amounts = extractAmounts(text)
  const references = extractReferences(text)
  const urls = extractUrls(text)
  const letterType = classifyLetter(text)
  const urgency = assessUrgency(text)
  const actions = getActions(letterType, text)

  const lines: string[] = []

  lines.push(`${urgency.indicator}  ${urgency.label}`)
  lines.push('')
  lines.push(`Letter type : ${letterType}`)
  lines.push(`Country     : ${country}`)
  lines.push('')
  lines.push('────────────────────────────────────────────')
  lines.push('Key facts extracted from your letter')
  lines.push('────────────────────────────────────────────')
  lines.push('')

  if (references.length > 0) {
    lines.push('Reference / case numbers:')
    references.forEach((r) => lines.push(`  • ${r}`))
    lines.push('')
  }

  if (dates.length > 0) {
    lines.push('Dates mentioned:')
    dates.forEach((d) => lines.push(`  • ${d}`))
    lines.push('')
  }

  if (amounts.length > 0) {
    lines.push('Monetary amounts:')
    amounts.forEach((a) => lines.push(`  • ${a}`))
    lines.push('')
  }

  if (urls.length > 0) {
    lines.push('Official links:')
    urls.forEach((u) => lines.push(`  • ${u}`))
    lines.push('')
  }

  if (references.length === 0 && dates.length === 0 && amounts.length === 0) {
    lines.push('No structured data (dates, amounts, reference numbers) detected.')
    lines.push('The letter may be written in a language the engine does not parse,')
    lines.push('or it may not contain standard reference formats.')
    lines.push('')
  }

  lines.push('────────────────────────────────────────────')
  lines.push('What you should do')
  lines.push('────────────────────────────────────────────')
  lines.push('')
  actions.forEach((a, i) => lines.push(`  ${i + 1}. ${a}`))
  lines.push('')

  if (targetLocale !== 'en') {
    lines.push('────────────────────────────────────────────')
    lines.push('Translation note')
    lines.push('────────────────────────────────────────────')
    lines.push('')
    lines.push('The analysis above was generated in English from the text you provided.')
    lines.push('For a full translation of the letter into your language, use:')
    lines.push('  • Google Translate — translate.google.com')
    lines.push('  • DeepL — deepl.com')
    lines.push('  • A certified professional translator (recommended for official / legal documents)')
    lines.push('')
  }

  return lines.join('\n')
}
