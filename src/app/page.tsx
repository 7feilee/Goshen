'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SUPPORTED_LOCALES = [
  'en', 'zh', 'es', 'hi', 'ar',
  'pt', 'fr', 'de', 'ja', 'ko',
  'tl', 'ru', 'tr', 'pl', 'uk',
]

/**
 * Root page: detect the visitor's browser language and redirect to the
 * matching locale. Falls back to English. This runs client-side so it works
 * in a fully static export with no server or middleware.
 */
export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const browserLang = (navigator.language ?? 'en').split('-')[0].toLowerCase()
    const locale = SUPPORTED_LOCALES.includes(browserLang) ? browserLang : 'en'
    router.replace(`/${locale}`)
  }, [router])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        color: '#888',
        fontSize: '14px',
      }}
    >
      Redirecting…
    </div>
  )
}
