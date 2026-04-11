import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = [
  'en', 'zh', 'es', 'hi', 'ar',
  'pt', 'fr', 'de', 'ja', 'ko',
  'tl', 'ru', 'tr', 'pl', 'uk',
] as const

export const defaultLocale = 'en' as const

export type ValidLocale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a Promise in next-intl v4 — await it to get the string.
  const locale = await requestLocale

  if (!locale || !locales.includes(locale as ValidLocale)) notFound()

  return {
    locale,
    messages: (await import(`../messages/${locale}/common.json`)).default,
  }
})
