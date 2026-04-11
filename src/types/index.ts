export type CountryCode = 'US' | 'DE' | 'UK' | 'CA' | 'AU' | 'FR' | 'NL' | 'SE' | 'CH' | 'NZ'

export type Locale =
  | 'en' | 'zh' | 'es' | 'hi' | 'ar'
  | 'pt' | 'fr' | 'de' | 'ja' | 'ko'
  | 'tl' | 'ru' | 'tr' | 'pl' | 'uk'

export type VisaCategory =
  | 'work'
  | 'study'
  | 'family'
  | 'asylum'
  | 'business'
  | 'working_holiday'
  | 'investor'

export type Pillar =
  | 'visa'
  | 'language'
  | 'family'
  | 'assets'
  | 'work'
  | 'business'

export interface Country {
  code: CountryCode
  name: string
  flag: string
  immigrantCount: string
  topOrigins: string[]
  languages: string[]
  visaSystem: string
}

export interface VisaRoute {
  id: string
  country: CountryCode
  name: string
  category: VisaCategory
  description: string
  requirements: string[]
  processingTime: string
  cost: string
  leadsTo: string | null   // e.g. 'PR', 'citizenship'
}

export interface Tool {
  id: string
  slug: string
  pillar: Pillar
  titleKey: string
  descriptionKey: string
  countries: CountryCode[]
  aiPowered: boolean
  status: 'live' | 'beta' | 'planned'
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface VisaFinderInput {
  originCountry: string
  destinationCountry: CountryCode
  purpose: VisaCategory
  currentStatus: string
  yearsExperience?: number
  hasJobOffer?: boolean
  hasFamily?: boolean
  userLocale: Locale
}

export interface LetterDecodeInput {
  text: string
  sourceLanguage: string
  targetLocale: Locale
  country: CountryCode
}

// ── Citizenship test ──────────────────────────────────────────────────────────

export type QuestionCategory =
  | 'Demokratie'
  | 'Grundrechte'
  | 'Geschichte'
  | 'Gesellschaft'
  | 'Staat'

export type FilterCategory = QuestionCategory | 'state' | 'all'

export type GermanState =
  | 'Baden-Württemberg'
  | 'Bayern'
  | 'Berlin'
  | 'Brandenburg'
  | 'Bremen'
  | 'Hamburg'
  | 'Hessen'
  | 'Mecklenburg-Vorpommern'
  | 'Niedersachsen'
  | 'Nordrhein-Westfalen'
  | 'Rheinland-Pfalz'
  | 'Saarland'
  | 'Sachsen'
  | 'Sachsen-Anhalt'
  | 'Schleswig-Holstein'
  | 'Thüringen'

export interface CitizenshipQuestion {
  id: number | string
  question: string         // in the test language (German for DE, English for others)
  options: string[]        // 4 options
  correctIndex: number
  category?: string        // category name varies by country
  explanation?: string     // optional English explanation
  explanation_zh?: string  // Chinese explanation (DE original source)
}

// ── PR eligibility checker ────────────────────────────────────────────────────

export type EmploymentStatus = 'employed' | 'self_employed' | 'student' | 'unemployed'
export type EducationLevel = 'highschool' | 'bachelor' | 'master' | 'phd'
export type PREligibility = 'likely' | 'partial' | 'ineligible'

export interface PRProfile {
  country: CountryCode
  residenceYears: number
  employmentStatus: EmploymentStatus
  annualIncomeUSD: number
  educationLevel: EducationLevel
  age: number
  languageScore: number    // IELTS equivalent (0–9) or CEF B1=5, B2=6, C1=7
  hasJobOffer: boolean
  hasSpouseCitizen: boolean
  hasSpousePR: boolean
  hasChildCitizen: boolean
  workedYears: number      // years of relevant work experience in destination country
}

export interface PRPathway {
  id: string
  country: CountryCode
  name: string
  stream: string
  description: string
  eligibility: PREligibility
  metRequirements: string[]
  missingRequirements: string[]
  processingTime: string
  officialUrl: string
  notes?: string
}

// ── Child benefits ─────────────────────────────────────────────────────────────

export type ResidencyStatus = 'citizen' | 'pr' | 'work_visa' | 'student_visa'

export interface ChildBenefitProfile {
  country: CountryCode
  residencyStatus: ResidencyStatus
  numChildren: number
  childAges: number[]
  annualIncomeUSD: number
  employmentStatus: EmploymentStatus
}

export interface Benefit {
  id: string
  name: string
  description: string
  monthlyAmountUSD: number | null   // null = variable/means-tested
  amountNote: string                // human-readable amount or formula
  eligibility: 'eligible' | 'likely' | 'check'
  requirements: string[]
  officialUrl: string
}
