'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { COUNTRY_LIST } from '@/lib/data/countries'
import { findVisaMatches, getCountryMeta } from '@/lib/engines/visa-finder'
import type { VisaMatch, MatchQuality, CountryMeta } from '@/lib/engines/visa-finder'
import type { CountryCode, Locale, VisaCategory } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────

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
  { value: 'working_holiday', label: 'Working holiday', icon: '🏖️' },
  { value: 'investor',        label: 'Investor',       icon: '💰' },
]

const QUALITY_CONFIG: Record<MatchQuality, { label: string; className: string }> = {
  strong:   { label: 'Strong match', className: 'bg-green-100 text-green-700' },
  good:     { label: 'Good match',   className: 'bg-blue-100 text-blue-700' },
  possible: { label: 'Possible',     className: 'bg-amber-100 text-amber-700' },
  weak:     { label: 'Weak match',   className: 'bg-gray-100 text-gray-500' },
}

// ── Sub-components ────────────────────────────────────────────────────────────

function VisaCard({ match, rank }: { match: VisaMatch; rank: number }) {
  const { visa, quality } = match
  const badge = QUALITY_CONFIG[quality]

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-4">
      {/* Title row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-sm font-bold text-gray-400 shrink-0">#{rank}</span>
          <h3 className="text-base font-bold text-gray-900 leading-snug">{visa.name}</h3>
        </div>
        <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${badge.className}`}>
          {badge.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{visa.description}</p>

      {/* Requirements */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Requirements
        </p>
        <ul className="space-y-1">
          {visa.requirements.map((r, i) => (
            <li key={i} className="text-sm text-gray-700 flex gap-2">
              <span className="text-gray-300 shrink-0 mt-0.5">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Processing</p>
          <p className="text-sm font-semibold text-gray-800">{visa.processingTime}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Fee</p>
          <p className="text-sm font-semibold text-gray-800">{visa.fee}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Duration</p>
          <p className="text-sm font-semibold text-gray-800">{visa.maxDuration}</p>
        </div>
      </div>

      {/* PR pathway */}
      {visa.leadsTo && (
        <p className="text-sm text-blue-700 bg-blue-50 rounded-xl px-4 py-2.5">
          <span className="font-semibold">Pathway to PR: </span>
          {visa.leadsTo}
        </p>
      )}

      {/* Annual cap warning */}
      {visa.annualCap != null && (
        <p className="text-sm text-amber-700 bg-amber-50 rounded-xl px-4 py-2.5">
          <span className="font-semibold">Annual cap: </span>
          {visa.annualCap.toLocaleString()} places — competitive lottery / draw
        </p>
      )}

      {/* Source link */}
      <a
        href={visa.source}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 transition-colors"
      >
        Official information ↗
      </a>
    </div>
  )
}

function ResultsSection({
  matches,
  meta,
  originCountry,
  purposeLabel,
  situation,
}: {
  matches: VisaMatch[]
  meta: CountryMeta
  originCountry: string
  purposeLabel: string
  situation: string[]
}) {
  if (matches.length === 0) {
    return (
      <div id="visa-results" className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
        <p className="text-base font-semibold text-gray-700 mb-2">
          No visa options found for &ldquo;{purposeLabel}&rdquo; in {meta.name}.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          This may mean no data yet, or this pathway isn&apos;t available for this destination.
        </p>
        <a
          href={meta.officialImmigrationWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Browse {meta.name}&apos;s official immigration site ↗
        </a>
      </div>
    )
  }

  return (
    <div id="visa-results" className="mt-12 space-y-4">
      {/* Results header */}
      <div className="flex flex-wrap items-baseline gap-3 mb-2">
        <h2 className="text-xl font-bold text-gray-900">
          {meta.flag} {meta.name} — {purposeLabel}
        </h2>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
          {matches.length} option{matches.length !== 1 ? 's' : ''} found
        </span>
      </div>
      {situation.length > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          Your situation: {originCountry} · {situation.join(' · ')}
        </p>
      )}

      {/* Cards */}
      {matches.map((match, i) => (
        <VisaCard key={match.visa.id} match={match} rank={i + 1} />
      ))}

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 flex flex-wrap justify-between gap-2 text-xs text-gray-400">
        <a
          href={meta.officialImmigrationWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          {meta.officialImmigrationWebsite} ↗
        </a>
        <span>Data verified {meta.lastVerified}</span>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors'

const labelClass = 'block text-sm font-semibold text-gray-700 mb-2'

export default function VisaFinderPage() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

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
  const [matches, setMatches] = useState<VisaMatch[] | null>(null)
  const [meta, setMeta] = useState<CountryMeta | null>(null)

  const set = (key: string, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }))

  function handleSubmit() {
    if (!form.originCountry || !form.currentStatus) return

    const results = findVisaMatches({
      originCountry: form.originCountry,
      destinationCountry: form.destinationCountry,
      purpose: form.purpose,
      currentStatus: form.currentStatus,
      hasJobOffer: form.hasJobOffer,
      hasFamily: form.hasFamily,
      yearsExperience: form.yearsExperience ? parseInt(form.yearsExperience) : undefined,
      userLocale: form.userLocale,
    })
    const countryMeta = getCountryMeta(form.destinationCountry)

    setMatches(results)
    setMeta(countryMeta)

    setTimeout(
      () => document.getElementById('visa-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    )
  }

  const canSubmit = !!form.originCountry && !!form.currentStatus

  const purposeLabel = PURPOSES.find((p) => p.value === form.purpose)?.label ?? form.purpose

  const situation: string[] = []
  if (form.hasJobOffer) situation.push('job offer in hand')
  if (form.hasFamily) situation.push('family already there')
  if (form.yearsExperience) situation.push(`${form.yearsExperience} yrs experience`)

  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href={`/${locale}/tools`} className="hover:text-gray-700 transition-colors">
          ← All tools
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
          🛂 Visa pathway finder
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Tell us your situation and we&apos;ll show every visa route available —
          requirements, fees, and the path to permanent residence.
        </p>
        <div className="flex gap-4 mt-4 text-sm text-gray-400">
          <span>🇺🇸 🇩🇪 🇬🇧 🇨🇦 🇦🇺 5 countries</span>
          <span>·</span>
          <span>No account needed</span>
          <span>·</span>
          <span>Runs in your browser</span>
        </div>
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
      {matches !== null && meta !== null && (
        <ResultsSection
          matches={matches}
          meta={meta}
          originCountry={form.originCountry}
          purposeLabel={purposeLabel}
          situation={situation}
        />
      )}

      {/* No data for this country */}
      {matches !== null && meta === null && (
        <div id="visa-results" className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
          <p className="text-base font-semibold text-gray-700 mb-2">
            No visa data yet for {form.destinationCountry}.
          </p>
          <p className="text-sm text-gray-500">
            We currently cover 🇺🇸 US · 🇩🇪 Germany · 🇬🇧 UK · 🇨🇦 Canada · 🇦🇺 Australia.
            More countries coming soon.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ <strong className="font-medium text-gray-600">General information only — not legal advice.</strong>{' '}
        For your specific situation, consult a licensed immigration lawyer or your
        country&apos;s official immigration authority.
      </p>
    </main>
  )
}
