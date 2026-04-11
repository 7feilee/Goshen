'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  calculateBenefits,
  BENEFIT_INCOME_LABELS,
  BENEFIT_INCOME_USD,
} from '@/lib/engines/child-benefits'
import type { ChildBenefitProfile, Benefit, CountryCode, ResidencyStatus } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const COUNTRIES: { code: CountryCode; flag: string; name: string }[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
]

const RESIDENCY_OPTIONS: { value: ResidencyStatus; label: string }[] = [
  { value: 'citizen',      label: 'Citizen' },
  { value: 'pr',           label: 'Permanent resident / ILR' },
  { value: 'work_visa',    label: 'Skilled work visa' },
  { value: 'student_visa', label: 'Student visa' },
]

const ELIGIBILITY_META = {
  eligible: { badge: 'bg-green-100 text-green-800', dot: 'bg-green-500', label: 'Eligible' },
  likely:   { badge: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500',  label: 'Likely eligible' },
  check:    { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400', label: 'Check eligibility' },
}

// ── Child age input row ────────────────────────────────────────────────────────

function AgeInputs({
  ages,
  onChange,
}: {
  ages: number[]
  onChange: (ages: number[]) => void
}) {
  function setAge(i: number, v: number) {
    const next = [...ages]
    next[i] = Math.min(25, Math.max(0, v))
    onChange(next)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ages.map((age, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-400">Child {i + 1}</span>
          <input
            type="number"
            min={0} max={25}
            value={age}
            onChange={(e) => setAge(i, Number(e.target.value))}
            className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:border-blue-400"
          />
        </div>
      ))}
    </div>
  )
}

// ── Benefit card ───────────────────────────────────────────────────────────────

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const [open, setOpen] = useState(false)
  const meta = ELIGIBILITY_META[benefit.eligibility]

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${meta.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <span className="text-base font-bold text-gray-900 leading-snug">{benefit.name}</span>
            <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${meta.badge}`}>
              {meta.label}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{benefit.description}</p>
          {benefit.monthlyAmountUSD && (
            <p className="mt-2 text-sm font-semibold text-gray-900">
              ~${benefit.monthlyAmountUSD.toLocaleString()}/month
              <span className="text-xs font-normal text-gray-400 ml-1">(approx. USD)</span>
            </p>
          )}
          <p className="mt-1 text-xs text-gray-400 leading-relaxed">{benefit.amountNote}</p>
        </div>
        <span className="shrink-0 text-gray-400 mt-1">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="bg-gray-50 px-5 pb-5 pt-4 border-t border-gray-100 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Requirements
            </p>
            <ul className="space-y-1.5">
              {benefit.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 shrink-0 mt-0.5">·</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={benefit.officialUrl}
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

export default function ChildBenefitsPage() {
  const pathname = usePathname()
  const locale   = pathname.split('/')[1] || 'en'

  const [country,    setCountry]    = useState<CountryCode>('US')
  const [numChildren, setNumChildren] = useState(1)
  const [childAges,  setChildAges]  = useState<number[]>([3])
  const [residency,  setResidency]  = useState<ResidencyStatus>('pr')
  const [incomeIdx,  setIncomeIdx]  = useState(2)
  const [results,    setResults]    = useState<Benefit[] | null>(null)

  function handleCountryChange(code: CountryCode) {
    setCountry(code)
    setResults(null)
    setIncomeIdx(2)
  }

  function handleNumChildrenChange(n: number) {
    const capped = Math.min(8, Math.max(1, n))
    setNumChildren(capped)
    setChildAges((prev) => {
      const next = [...prev]
      while (next.length < capped) next.push(0)
      return next.slice(0, capped)
    })
    setResults(null)
  }

  function handleCheck() {
    const usdValues = BENEFIT_INCOME_USD[country]
    const annualIncomeUSD = usdValues[incomeIdx] ?? 50000
    const profile: ChildBenefitProfile = {
      country,
      residencyStatus: residency,
      numChildren,
      childAges: childAges.slice(0, numChildren),
      annualIncomeUSD,
      employmentStatus: 'employed',
    }
    setResults(calculateBenefits(profile))
    setTimeout(() => {
      document.getElementById('benefits-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const incomeLabels = BENEFIT_INCOME_LABELS[country] ?? []
  const eligibleCount = results?.filter(b => b.eligibility === 'eligible').length ?? 0
  const likelyCount = results?.filter(b => b.eligibility === 'likely').length ?? 0
  const countryInfo = COUNTRIES.find(c => c.code === country)

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
          👶 Child Benefits Finder
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          Discover the child allowances, tax credits, and subsidies you may be
          entitled to as an immigrant parent. 5 countries. Instant results.
        </p>
      </div>

      {/* Country selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span>🌍</span> Country of residence
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
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-5 space-y-5">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span>👨‍👩‍👧</span> Your family
        </h2>

        {/* Residency status */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Your immigration status</span>
          <select
            value={residency}
            onChange={(e) => { setResidency(e.target.value as ResidencyStatus); setResults(null) }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
          >
            {RESIDENCY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>

        {/* Number of children */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Number of children</span>
          <input
            type="number"
            min={1} max={8}
            value={numChildren}
            onChange={(e) => handleNumChildrenChange(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
          />
        </label>

        {/* Child ages */}
        <div>
          <span className="text-xs font-medium text-gray-500 mb-2 block">
            Age of each child (0 = newborn)
          </span>
          <AgeInputs ages={childAges.slice(0, numChildren)} onChange={setChildAges} />
        </div>

        {/* Annual income */}
        <label className="block">
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">Annual household income</span>
          <select
            value={incomeIdx}
            onChange={(e) => { setIncomeIdx(Number(e.target.value)); setResults(null) }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
          >
            {incomeLabels.map((label, i) => (
              <option key={i} value={i}>{label}</option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleCheck}
          className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-700 transition-colors mt-2"
        >
          Find my benefits →
        </button>
      </div>

      {/* Results */}
      {results !== null && (
        <div id="benefits-results" className="space-y-4">

          {/* Summary */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 flex-wrap">
            <div>
              <p className="text-lg font-bold text-gray-900">
                {results.length} benefit{results.length !== 1 ? 's' : ''} found
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {countryInfo?.flag} {countryInfo?.name} · {numChildren} child{numChildren !== 1 ? 'ren' : ''}
              </p>
            </div>
            <div className="flex gap-3 ml-auto flex-wrap">
              {eligibleCount > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {eligibleCount} eligible
                </span>
              )}
              {likelyCount > 0 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {likelyCount} likely
                </span>
              )}
            </div>
          </div>

          {results.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-sm">No benefits matched for this combination. Try changing your residency status or country.</p>
            </div>
          ) : (
            [...results]
              .sort((a, b) => {
                const order = { eligible: 0, likely: 1, check: 2 }
                return order[a.eligibility] - order[b.eligibility]
              })
              .map((b) => <BenefitCard key={b.id} benefit={b} />)
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
            ⚠️ <strong>Estimates only.</strong> Benefit amounts and eligibility rules change.
            Always verify with the official government agency before applying.
          </div>
        </div>
      )}

      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ <strong className="font-medium text-gray-600">General information only.</strong>{' '}
        Not financial or legal advice. Amounts based on 2024–25 rates and may change.
      </p>
    </main>
  )
}
