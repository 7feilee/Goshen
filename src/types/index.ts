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
