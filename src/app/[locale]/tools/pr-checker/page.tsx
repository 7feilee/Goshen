'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  checkPREligibility,
  COUNTRY_INCOME_LABELS,
  INCOME_USD_VALUES,
  LANGUAGE_OPTIONS,
} from '@/lib/engines/pr-checker'
import type { PRProfile, PRPathway, CountryCode, EducationLevel, EmploymentStatus } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const COUNTRIES: { code: CountryCode; flag: string; name: string }[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
]

const EDUCATION_OPTIONS: { value: EducationLevel; label: string }[] = [
  { value: 'highschool', label: 'High school / secondary' },
  { value: 'bachelor',   label: 'Bachelor\'s degree' },
  { value: 'master',     label: 'Master\'s degree' },
  { value: 'phd',        label: 'PhD / Doctorate' },
]

const EMPLOYMENT_OPTIONS: { value: EmploymentStatus; label: string }[] = [
  { value: 'employed',      label: 'Employed (for a company)' },
  { value: 'self_employed', label: 'Self-employed / Freelance' },
  { value: 'student',       label: 'Student' },
  { value: 'unemployed',    label: 'Unemployed / Between jobs' },
]

const ELIGIBILITY_META = {
  likely:    { label: 'Likely eligible',      bg: 'bg-green-50',  border: 'border-green-200', badge: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  partial:   { label: 'Partially eligible',   bg: 'bg-amber-50',  border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800', dot: 'bg-amber-400' },
  ineligible:{ label: 'Not currently eligible', bg: 'bg-gray-50', border: 'border-gray-200',  badge: 'bg-gray-100 text-gray-500',   dot: 'bg-gray-300'  },
}

// ── Default form state ─────────────────────────────────────────────────────────

function defaultProfile(country: CountryCode): PRProfile {
  return {
    country,
    residenceYears: 0,
    employmentStatus: 'employed',
    annualIncomeUSD: 50000,
    educationLevel: 'bachelor',
    age: 30,
    languageScore: 6,
    hasJobOffer: false,
    hasSpouseCitizen: false,
    hasSpousePR: false,
    hasChildCitizen: false,
    workedYears: 0,
  }
}

// ── Pathway card ───────────────────────────────────────────────────────────────

function PathwayCard({ pathway }: { pathway: PRPathway }) {
  const [open, setOpen] = useState(false)
  const meta = ELIGIBILITY_META[pathway.eligibility]

  return (
    <div className={`border-2 rounded-2xl overflow-hidden ${meta.border}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-start gap-4 p-5 text-left transition-colors ${meta.bg} hover:brightness-95`}
      >
        <span className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ${meta.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <span className="text-base font-bold text-gray-900 leading-snug">{pathway.name}</span>
            <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${meta.badge}`}>
              {meta.label}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{pathway.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
            <span>⏱ {pathway.processingTime}</span>
            <span>· {pathway.stream}</span>
          </div>
        </div>
        <span className="shrink-0 text-gray-400 mt-1">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="bg-white px-5 pb-5 pt-4 border-t border-gray-100 space-y-4">
          {pathway.metRequirements.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                ✅ Requirements met
              </p>
              <ul className="space-y-1">
                {pathway.metRequirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pathway.missingRequirements.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
                ❌ Missing / Check required
              </p>
              <ul className="space-y-1">
                {pathway.missingRequirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pathway.notes && (
            <p className="text-xs text-blue-800 bg-blue-50 rounded-lg px-3 py-2 leading-relaxed">
              💡 {pathway.notes}
            </p>
          )}
          <a
            href={pathway.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
          >
            Official source ↗
          </a>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PRCheckerPage() {
  const pathname = usePathname()
  const locale   = pathname.split('/')[1] || 'en'

  const [country,  setCountry]  = useState<CountryCode>('US')
  const [profile,  setProfile]  = useState<PRProfile>(defaultProfile('US'))
  const [results,  setResults]  = useState<PRPathway[] | null>(null)
  const [incomeIdx, setIncomeIdx] = useState(2)  // index into COUNTRY_INCOME_LABELS

  function handleCountryChange(code: CountryCode) {
    setCountry(code)
    setProfile(defaultProfile(code))
    setResults(null)
    setIncomeIdx(2)
  }

  function handleCheck() {
    const usdValues = INCOME_USD_VALUES[country]
    const annualIncomeUSD = usdValues[incomeIdx] ?? 50000
    const result = checkPREligibility({ ...profile, country, annualIncomeUSD })
    setResults(result)
    // Scroll to results after a tick
    setTimeout(() => {
      document.getElementById('pr-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function update<K extends keyof PRProfile>(key: K, value: PRProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }))
    setResults(null)
  }

  const langOptions = LANGUAGE_OPTIONS[country] ?? []
  const incomeLabels = COUNTRY_INCOME_LABELS[country] ?? []

  const likelyCount  = results?.filter((r) => r.eligibility === 'likely').length ?? 0
  const partialCount = results?.filter((r) => r.eligibility === 'partial').length ?? 0

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 max-w-3xl mx-auto">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href={`/${locale}/tools`} className="hover:text-gray-700 transition-colors">
          ← All tools
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
          🏠 PR Eligibility Checker
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          Check which permanent residence pathways you may qualify for in 5 countries.
          Rule-based · No AI · No account · Instant results.
        </p>
      </div>

      {/* Country selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span>🌍</span> Destination country
        </h2>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleCountryChange(c.code)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                country === c.code
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 space-y-5">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span>📋</span> Your profile
        </h2>

        {/* Age + Years of residence */}
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-medium text-gray-500 mb-1.5 block">Age</span>
            <input
              type="number"
              min={18} max={75}
              value={profile.age}
              onChange={(e) => update('age', Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-gray-500 mb-1.5 block">Years of legal residence in destination</span>
            <input
              type="number"
              min={0} max={20}
              value={profile.residenceYears}
              onChange={(e) => update('residenceYears', Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </label>
        </div>

        {/* Years worked in country */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">
            Years of skilled work experience in {COUNTRIES.find(c => c.code === country)?.name}
          </span>
          <input
            type="number"
            min={0} max={20}
            value={profile.workedYears}
            onChange={(e) => update('workedYears', Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
          />
        </label>

        {/* Education */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Highest education level</span>
          <select
            value={profile.educationLevel}
            onChange={(e) => update('educationLevel', e.target.value as EducationLevel)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
          >
            {EDUCATION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>

        {/* Employment status */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Current employment</span>
          <select
            value={profile.employmentStatus}
            onChange={(e) => update('employmentStatus', e.target.value as EmploymentStatus)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
          >
            {EMPLOYMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>

        {/* Annual income */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Annual household income</span>
          <select
            value={incomeIdx}
            onChange={(e) => setIncomeIdx(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
          >
            {incomeLabels.map((label, i) => (
              <option key={i} value={i}>{label}</option>
            ))}
          </select>
        </label>

        {/* Language */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">
            Language proficiency {country === 'DE' ? '(German)' : '(English)'}
          </span>
          <select
            value={profile.languageScore}
            onChange={(e) => update('languageScore', Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
          >
            {langOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>

        {/* Checkboxes */}
        <div className="space-y-3 pt-1">
          <p className="text-xs font-medium text-gray-500">Additional factors</p>
          {[
            { key: 'hasJobOffer' as const,       label: 'I have a job offer in the destination country' },
            { key: 'hasSpouseCitizen' as const,  label: 'My spouse / partner is a citizen of the destination country' },
            { key: 'hasSpousePR' as const,       label: 'My spouse / partner is a permanent resident' },
            { key: 'hasChildCitizen' as const,   label: 'I have a child who is a citizen of the destination country' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={profile[key]}
                onChange={(e) => update(key, e.target.checked)}
                className="w-4 h-4 rounded accent-gray-900"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCheck}
          className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-700 transition-colors mt-2"
        >
          Check my eligibility →
        </button>
      </div>

      {/* Results */}
      {results !== null && (
        <div id="pr-results" className="space-y-4">
          {/* Summary bar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 flex-wrap">
            <div>
              <p className="text-lg font-bold text-gray-900">
                {results.filter(r => r.eligibility !== 'ineligible').length} of {results.length} pathways open to you
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {COUNTRIES.find(c => c.code === country)?.flag}{' '}
                {COUNTRIES.find(c => c.code === country)?.name}
              </p>
            </div>
            <div className="flex gap-3 ml-auto flex-wrap">
              {likelyCount > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {likelyCount} likely
                </span>
              )}
              {partialCount > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {partialCount} partial
                </span>
              )}
            </div>
          </div>

          {/* Sort: likely first, then partial, then ineligible */}
          {[...results]
            .sort((a, b) => {
              const order = { likely: 0, partial: 1, ineligible: 2 }
              return order[a.eligibility] - order[b.eligibility]
            })
            .map((pathway) => (
              <PathwayCard key={pathway.id} pathway={pathway} />
            ))}

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
            ⚠️ <strong>General guidance only.</strong> Immigration rules change frequently.
            This tool gives rule-based estimates — not legal advice. Always verify with an
            official government website or a licensed immigration lawyer before applying.
          </div>
        </div>
      )}

      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ <strong className="font-medium text-gray-600">Not legal advice.</strong>{' '}
        Immigration rules change frequently. Verify with official government sources.
      </p>
    </main>
  )
}
