'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getPetData } from '@/lib/engines/pet-import'
import type { RequirementItem } from '@/lib/engines/pet-import'
import type { CountryCode } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const COUNTRIES: { code: CountryCode; flag: string; name: string }[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
]

const DIFFICULTY_META = {
  easy:     { label: 'Easy entry',    color: 'bg-green-100 text-green-800',  dot: 'bg-green-500' },
  moderate: { label: 'Moderate',      color: 'bg-amber-100 text-amber-800',  dot: 'bg-amber-500' },
  strict:   { label: 'Strict / Quarantine', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; icon_bg: string }> = {
  requirements: { bg: 'bg-blue-50',   border: 'border-blue-200',   icon_bg: 'bg-blue-100' },
  process:      { bg: 'bg-purple-50', border: 'border-purple-200', icon_bg: 'bg-purple-100' },
  regulations:  { bg: 'bg-orange-50', border: 'border-orange-200', icon_bg: 'bg-orange-100' },
  quarantine:   { bg: 'bg-red-50',    border: 'border-red-200',    icon_bg: 'bg-red-100' },
  costs:        { bg: 'bg-green-50',  border: 'border-green-200',  icon_bg: 'bg-green-100' },
}

// ── Requirements checklist ────────────────────────────────────────────────────

function RequirementsChecklist({ items }: { items: RequirementItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
            item.mandatory
              ? 'bg-white border-gray-200'
              : 'bg-gray-50 border-gray-100'
          }`}
        >
          {/* Mandatory/optional indicator */}
          <div className="shrink-0 mt-0.5">
            {item.mandatory ? (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
            ) : (
              <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center">
                ~
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">{item.label}</span>
              {item.mandatory ? (
                <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-medium shrink-0">
                  Required
                </span>
              ) : (
                <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium shrink-0">
                  Conditional
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{item.detail}</p>
            {item.timing && (
              <p className="text-xs text-amber-700 mt-1 flex items-center gap-1">
                <span>⏱</span> {item.timing}
              </p>
            )}
            {item.note && (
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PetImportPage() {
  const pathname = usePathname()
  const locale   = pathname.split('/')[1] || 'en'

  const [country,  setCountry]  = useState<CountryCode>('US')
  const [openCats, setOpenCats] = useState<Set<string>>(new Set(['requirements', 'process']))
  const [showChecklist, setShowChecklist] = useState(true)

  const data = getPetData(country)

  function toggleCat(id: string) {
    setOpenCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleCountryChange(code: CountryCode) {
    setCountry(code)
    setOpenCats(new Set(['requirements', 'process']))
  }

  if (!data) return null

  const diffMeta = DIFFICULTY_META[data.difficultyLevel]

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 max-w-3xl mx-auto">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href={`/${locale}/tools`} className="hover:text-gray-700 transition-colors">
          ← All tools
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
          🐾 Pet Import Guide
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          Bring your cat or dog when you relocate. Country-specific entry
          requirements, quarantine rules, ongoing regulations, and costs.
        </p>
      </div>

      {/* Country selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Destination country
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

      {/* Difficulty banner */}
      <div className={`rounded-2xl px-5 py-4 mb-5 flex items-start gap-3 border ${
        data.difficultyLevel === 'easy'     ? 'bg-green-50 border-green-200' :
        data.difficultyLevel === 'moderate' ? 'bg-amber-50 border-amber-200' :
                                              'bg-red-50 border-red-200'
      }`}>
        <span className="text-2xl shrink-0">
          {data.difficultyLevel === 'easy' ? '✅' : data.difficultyLevel === 'moderate' ? '⚠️' : '🚨'}
        </span>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${diffMeta.color}`}>
              {diffMeta.label}
            </span>
            <span className="text-sm font-bold text-gray-900">{data.flag} {data.name}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{data.difficultyNote}</p>
        </div>
      </div>

      {/* Immigrant note */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl px-5 py-4 mb-5 flex items-start gap-3">
        <span className="text-2xl shrink-0">🌍</span>
        <div>
          <p className="text-sm font-semibold text-teal-800 mb-0.5">For immigrant pet owners</p>
          <p className="text-sm text-teal-700 leading-relaxed">{data.immigrantNote}</p>
        </div>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {data.keyNumbers.map((kn) => (
          <div key={kn.label} className="bg-white border border-gray-100 rounded-2xl p-4">
            <p className="text-xl font-black text-gray-900 leading-none mb-1">{kn.value}</p>
            <p className="text-xs font-semibold text-gray-600 mb-0.5">{kn.label}</p>
            {kn.sub && <p className="text-xs text-gray-400 leading-snug">{kn.sub}</p>}
          </div>
        ))}
      </div>

      {/* Entry requirements checklist */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5">
        <button
          type="button"
          onClick={() => setShowChecklist(v => !v)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span>✅</span> Entry Requirements Checklist
            <span className="text-xs font-normal text-gray-400 ml-1">
              — {data.requirements.filter(r => r.mandatory).length} required · {data.requirements.filter(r => !r.mandatory).length} conditional
            </span>
          </h2>
          <span className="text-gray-400 shrink-0">{showChecklist ? '▲' : '▼'}</span>
        </button>
        {showChecklist && (
          <div className="mt-4">
            <RequirementsChecklist items={data.requirements} />
          </div>
        )}
      </div>

      {/* Expandable categories */}
      <div className="space-y-3">
        {data.categories.map((cat) => {
          const isOpen = openCats.has(cat.id)
          const colors = CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.requirements
          return (
            <div key={cat.id} className={`border-2 rounded-2xl overflow-hidden ${colors.border}`}>
              <button
                type="button"
                onClick={() => toggleCat(cat.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${colors.bg} hover:brightness-95`}
              >
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${colors.icon_bg} shrink-0`}>
                  {cat.icon}
                </span>
                <span className="text-base font-bold text-gray-900 flex-1">{cat.title}</span>
                <span className="text-gray-400 shrink-0">{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="bg-white px-5 pb-5 pt-4 divide-y divide-gray-50">
                  {cat.sections.map((section, si) => (
                    <div key={si} className={si > 0 ? 'pt-4' : ''}>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                        {section.heading}
                      </p>
                      <div className="space-y-2">
                        {section.items.map((item, ii) => (
                          <div key={ii}>
                            <div className="flex items-start gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-gray-800">{item.label}:</span>
                              <span className="text-sm text-gray-600">{item.value}</span>
                            </div>
                            {item.note && (
                              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.note}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Official authority */}
      <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 mt-5 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
            Official authority
          </p>
          <p className="text-sm font-bold text-gray-800">{data.officialAuthority.name}</p>
        </div>
        <a
          href={data.officialAuthority.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline font-medium shrink-0"
        >
          Official website ↗
        </a>
      </div>

      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ <strong className="font-medium text-gray-600">Regulations change frequently.</strong>{' '}
        Always verify requirements with the official authority or your airline before travel.
        Your country of origin may also have export requirements for pets.
      </p>
    </main>
  )
}
