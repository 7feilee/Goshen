import type { Country } from '@/types'

export const COUNTRIES: Record<string, Country> = {
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    immigrantCount: '50M',
    topOrigins: ['Mexico', 'India', 'China', 'Philippines', 'El Salvador'],
    languages: ['en', 'es'],
    visaSystem: 'USCIS',
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    immigrantCount: '16M',
    topOrigins: ['Turkey', 'Poland', 'Syria', 'Romania', 'Italy'],
    languages: ['de', 'en'],
    visaSystem: 'BAMF',
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    immigrantCount: '10M',
    topOrigins: ['India', 'Poland', 'Pakistan', 'Romania', 'Ireland'],
    languages: ['en'],
    visaSystem: 'UKVI',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    immigrantCount: '8.3M',
    topOrigins: ['India', 'China', 'Philippines', 'Pakistan', 'USA'],
    languages: ['en', 'fr'],
    visaSystem: 'IRCC',
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    immigrantCount: '8M',
    topOrigins: ['UK', 'India', 'China', 'New Zealand', 'Philippines'],
    languages: ['en'],
    visaSystem: 'Home Affairs',
  },
}

export const COUNTRY_LIST = Object.values(COUNTRIES)
