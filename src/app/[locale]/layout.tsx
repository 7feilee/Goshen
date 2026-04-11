import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { locales } from '@/i18n/request'
import type { ValidLocale } from '@/i18n/request'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: {
    default: 'Goshen — Free tools for every immigrant',
    template: '%s · Goshen',
  },
  description:
    'Goshen — free tools for every immigrant: visa pathways, letter decoder, citizenship tests, and more. 15 languages. 5 countries. No paywalls, no ads.',
  openGraph: {
    type: 'website',
    siteName: 'Goshen',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as ValidLocale)) notFound()

  // Prime the locale cache so next-intl never falls back to headers()
  // — required for output: 'export' (static rendering)
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Security — some hosts don't serve HTTP headers for static files */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {/* ── Sticky top nav ───────────────────────────────────────────── */}
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
              {/* Logo */}
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 shrink-0"
                aria-label="Goshen home"
              >
                <span className="text-2xl" aria-hidden="true">🌍</span>
                <span className="font-semibold text-gray-900 text-base hidden sm:block leading-none">
                  Goshen
                </span>
              </Link>

              {/* Quick-access tool links */}
              <nav
                className="flex items-center gap-1 sm:gap-2"
                aria-label="Main navigation"
              >
                <Link
                  href={`/${locale}/tools/visa-finder`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <span aria-hidden="true">🛂</span>
                  <span className="hidden sm:inline">Visa finder</span>
                </Link>
                <Link
                  href={`/${locale}/tools/letter-decoder`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <span aria-hidden="true">📄</span>
                  <span className="hidden sm:inline">Letter decoder</span>
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                  <span className="hidden sm:inline">All tools</span>
                  <span className="sm:hidden">Tools</span>
                </Link>
              </nav>
            </div>
          </header>

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
