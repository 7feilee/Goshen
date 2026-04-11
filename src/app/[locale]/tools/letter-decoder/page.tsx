'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { COUNTRY_LIST } from '@/lib/data/countries'
import { decodeLetter } from '@/lib/engines/letter-decoder'
import type { CountryCode, Locale } from '@/types'

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ar', name: 'العربية' },
  { code: 'pt', name: 'Português' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'ru', name: 'Русский' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'pl', name: 'Polski' },
  { code: 'uk', name: 'Українська' },
]

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors'

const labelClass = 'block text-sm font-semibold text-gray-700 mb-2'

export default function LetterDecoderPage() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  const [letterText, setLetterText] = useState('')
  const [country, setCountry] = useState<CountryCode>('US')
  const [targetLocale, setTargetLocale] = useState<Locale>('en')
  const [result, setResult] = useState('')

  function handleDecode() {
    if (!letterText.trim()) return

    const output = decodeLetter({
      text: letterText,
      sourceLanguage: 'auto',
      targetLocale,
      country,
    })

    setResult(output)
    setTimeout(() => document.getElementById('letter-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href={`/${locale}/tools`} className="hover:text-gray-700 transition-colors">← All tools</Link>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
          📄 Official letter decoder
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Paste any government or official letter. We'll extract the key facts —
          deadlines, reference numbers, amounts, and what you need to do next.
        </p>
      </div>

      <div className="space-y-6">

        {/* Country + Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="letter-country" className={labelClass}>Letter is from</label>
            <select
              id="letter-country"
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
              className={inputClass}
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="letter-locale" className={labelClass}>Explain to me in</label>
            <select
              id="letter-locale"
              value={targetLocale}
              onChange={(e) => setTargetLocale(e.target.value as Locale)}
              className={inputClass}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Letter textarea */}
        <div>
          <label htmlFor="letter-text" className={labelClass}>Paste your letter here</label>
          <textarea
            id="letter-text"
            value={letterText}
            onChange={(e) => setLetterText(e.target.value)}
            rows={12}
            placeholder="Dear Mr Smith,&#10;&#10;We are writing to inform you that your application for..."
            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-base font-mono resize-y focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors leading-relaxed"
            spellCheck={false}
          />
          <p className="mt-2 text-sm text-gray-400">
            Your letter is processed entirely in your browser — it is never sent to any server.
          </p>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleDecode}
          disabled={!letterText.trim()}
          className="w-full bg-gray-900 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          Decode this letter →
        </button>
      </div>

      {/* Results */}
      {result && (
        <div id="letter-results" className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Analysis</h2>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              Processed locally
            </span>
          </div>
          <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-mono break-words">
              {result}
            </pre>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ <strong className="font-medium text-gray-600">General information only — not legal advice.</strong>{' '}
        For your specific situation, consult a licensed immigration lawyer.
      </p>
    </main>
  )
}
