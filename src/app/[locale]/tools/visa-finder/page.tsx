'use client'

import { useState } from 'react'
import Link from 'next/link'
import { COUNTRY_LIST } from '@/lib/data/countries'
import { findVisaOptions } from '@/lib/engines/visa-finder'
import type { CountryCode, Locale, VisaCategory } from '@/types'

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

const PURPOSES: { value: VisaCategory; label: string; icon: string }[] = [
  { value: 'work',            label: 'Work',           icon: '💼' },
  { value: 'study',           label: 'Study',          icon: '🎓' },
  { value: 'family',          label: 'Join family',    icon: '👨‍👩‍👧' },
  { value: 'asylum',          label: 'Asylum',         icon: '🛡️' },
  { value: 'business',        label: 'Business',       icon: '🏢' },
  { value: 'working_holiday', label: 'Working holiday',icon: '🏖️' },
  { value: 'investor',        label: 'Investor',       icon: '💰' },
]

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors'

const labelClass = 'block text-sm font-semibold text-gray-700 mb-2'

export default function VisaFinderPage() {
  const [form, setForm] = useState({
    originCountry: '',
    destinationCountry: 'US' as CountryCode,
    purpose: 'work' as VisaCategory,
    currentStatus: '',
    hasJobOffer: false,
    hasFamily: false,
    yearsExperience: '',
    userLocale: 'en' as Locale,
  })
  const [result, setResult] = useState('')

  const set = (key: string, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }))

  function handleSubmit() {
    if (!form.originCountry || !form.currentStatus) return

    const output = findVisaOptions({
      originCountry: form.originCountry,
      destinationCountry: form.destinationCountry,
      purpose: form.purpose,
      currentStatus: form.currentStatus,
      hasJobOffer: form.hasJobOffer,
      hasFamily: form.hasFamily,
      yearsExperience: form.yearsExperience ? parseInt(form.yearsExperience) : undefined,
      userLocale: form.userLocale,
    })

    setResult(output)
    // Scroll to results after a tick
    setTimeout(() => document.getElementById('visa-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const canSubmit = !!form.originCountry && !!form.currentStatus

  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href=".." className="hover:text-gray-700 transition-colors">← All tools</Link>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
          🛂 Visa pathway finder
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Tell us your situation and we'll show every visa route available —
          requirements, fees, and the path to permanent residence.
        </p>
      </div>

      <div className="space-y-6">

        {/* Origin + Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="origin" className={labelClass}>I am from</label>
            <input
              id="origin"
              type="text"
              placeholder="India, Mexico, Syria…"
              value={form.originCountry}
              onChange={(e) => set('originCountry', e.target.value)}
              className={inputClass}
              autoComplete="country-name"
            />
          </div>
          <div>
            <label htmlFor="destination" className={labelClass}>I want to move to</label>
            <select
              id="destination"
              value={form.destinationCountry}
              onChange={(e) => set('destinationCountry', e.target.value)}
              className={inputClass}
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Purpose */}
        <div>
          <span className={labelClass}>Purpose of move</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PURPOSES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => set('purpose', p.value)}
                aria-pressed={form.purpose === p.value}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-colors ${
                  form.purpose === p.value
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                <span aria-hidden="true">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Current status */}
        <div>
          <label htmlFor="status" className={labelClass}>Current immigration status</label>
          <input
            id="status"
            type="text"
            placeholder="Tourist visa, student visa, undocumented, citizen of home country…"
            value={form.currentStatus}
            onChange={(e) => set('currentStatus', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Experience + language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="experience" className={labelClass}>Years of work experience</label>
            <input
              id="experience"
              type="number"
              min="0"
              placeholder="e.g. 5"
              value={form.yearsExperience}
              onChange={(e) => set('yearsExperience', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="locale" className={labelClass}>Language for results</label>
            <select
              id="locale"
              value={form.userLocale}
              onChange={(e) => set('userLocale', e.target.value)}
              className={inputClass}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-base text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.hasJobOffer}
              onChange={(e) => set('hasJobOffer', e.target.checked)}
              className="w-5 h-5 rounded accent-gray-900"
            />
            I have a job offer
          </label>
          <label className="flex items-center gap-3 text-base text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.hasFamily}
              onChange={(e) => set('hasFamily', e.target.checked)}
              className="w-5 h-5 rounded accent-gray-900"
            />
            I have family there
          </label>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full bg-gray-900 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          Find my visa options →
        </button>

        {!canSubmit && (
          <p className="text-sm text-gray-400 text-center">
            Fill in your origin country and current status to continue.
          </p>
        )}
      </div>

      {/* Results */}
      {result && (
        <div id="visa-results" className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your visa options</h2>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
              Live data
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
        For your specific situation, consult a licensed immigration lawyer or your
        country's official immigration authority.
      </p>
    </main>
  )
}
