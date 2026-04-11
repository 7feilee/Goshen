'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WORKER_RIGHTS, getWorkerRights } from '@/lib/engines/worker-rights'
import type { CountryCode } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const COUNTRIES: { code: CountryCode; flag: string; name: string }[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
]

const CATEGORY_COLORS: Record<string, { bg: string; border: string; icon_bg: string }> = {
  pay:        { bg: 'bg-green-50',  border: 'border-green-200',  icon_bg: 'bg-green-100' },
  leave:      { bg: 'bg-blue-50',   border: 'border-blue-200',   icon_bg: 'bg-blue-100' },
  protection: { bg: 'bg-purple-50', border: 'border-purple-200', icon_bg: 'bg-purple-100' },
  rights:     { bg: 'bg-orange-50', border: 'border-orange-200', icon_bg: 'bg-orange-100' },
  immigrant:  { bg: 'bg-teal-50',   border: 'border-teal-200',   icon_bg: 'bg-teal-100' },
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WorkerRightsPage() {
  const pathname = usePathname()
  const locale   = pathname.split('/')[1] || 'en'

  const [country,  setCountry]  = useState<CountryCode>('US')
  const [openCats, setOpenCats] = useState<Set<string>>(new Set(['pay', 'immigrant']))

  const data = getWorkerRights(country)

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
    setOpenCats(new Set(['pay', 'immigrant']))
  }

  if (!data) return null

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
          ⚖️ Worker Rights
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          Know your rights as an immigrant worker. Minimum wage, leave, job protection,
          and protections specific to visa holders.
        </p>
      </div>

      {/* Country selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Country of work
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

      {/* Immigrant note — always prominent */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl px-5 py-4 mb-5 flex items-start gap-3">
        <span className="text-2xl shrink-0">🌍</span>
        <div>
          <p className="text-sm font-semibold text-teal-800 mb-0.5">For immigrant workers</p>
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

      {/* Expandable categories */}
      <div className="space-y-3">
        {data.categories.map((cat) => {
          const isOpen  = openCats.has(cat.id)
          const colors  = CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.rights
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
                          <div key={ii} className="flex items-start gap-3">
                            <div className="flex-1">
                              <div className="flex items-start gap-2 flex-wrap">
                                <span className="text-sm font-semibold text-gray-800">{item.label}:</span>
                                <span className="text-sm text-gray-600">{item.value}</span>
                              </div>
                              {item.note && (
                                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.note}</p>
                              )}
                            </div>
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
        ⚠️ <strong className="font-medium text-gray-600">General information only.</strong>{' '}
        Laws change. Always verify with the official authority or a qualified employment lawyer
        for your specific situation.
      </p>
    </main>
  )
}
