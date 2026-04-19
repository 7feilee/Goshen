'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { TOOLS_BY_PILLAR } from '@/lib/data/tools'
import { COUNTRY_LIST } from '@/lib/data/countries'
import type { CountryCode } from '@/types'

const PILLAR_ORDER = ['visa', 'work', 'language', 'family', 'assets', 'business']

const PILLAR_META: Record<string, { icon: string; label: string; color: string }> = {
  visa:     { icon: '🛂', label: 'Visas & Status',     color: 'bg-blue-50 border-blue-100' },
  work:     { icon: '⚖️', label: 'Work & Rights',      color: 'bg-rose-50 border-rose-100' },
  language: { icon: '💬', label: 'Language',            color: 'bg-teal-50 border-teal-100' },
  family:   { icon: '👨‍👩‍👧', label: 'Family & Kids',     color: 'bg-purple-50 border-purple-100' },
  assets:   { icon: '💰', label: 'Money & Benefits',   color: 'bg-amber-50 border-amber-100' },
  business: { icon: '🏢', label: 'Business',            color: 'bg-green-50 border-green-100' },
}

const COMMUNITY_PLACES = [
  {
    name: 'Heidelberg Sprachcafé',
    description: 'Weekly language exchange events — co-cooking, café talks, and language nights across the city.',
    icon: '☕',
    badge: '🇩🇪 Heidelberg',
    path: '/places/heidelberg',
    color: 'bg-orange-50 border-orange-100 hover:border-orange-300',
  },
]

export default function ToolsGrid({ locale }: { locale: string }) {
  const t             = useTranslations()
  const searchParams  = useSearchParams()
  const selectedCode  = searchParams.get('country') ?? null
  const validCodes    = COUNTRY_LIST.map((c) => c.code as CountryCode)
  const activeCountry = validCodes.includes(selectedCode as CountryCode) ? selectedCode : null

  // Filter tools per pillar by selected country (or show all), in defined order
  const visiblePillars = PILLAR_ORDER
    .filter((p) => TOOLS_BY_PILLAR[p])
    .map((pillar) => ({
      pillar,
      tools: activeCountry
        ? TOOLS_BY_PILLAR[pillar].filter((t) => t.countries.includes(activeCountry as CountryCode))
        : TOOLS_BY_PILLAR[pillar],
    }))
    .filter(({ tools }) => tools.length > 0)

  const selectedCountryMeta = activeCountry
    ? COUNTRY_LIST.find((c) => c.code === activeCountry)
    : null

  return (
    <>
      {/* Country filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="text-xs font-medium text-gray-400 self-center mr-1">
          Filter by country
        </span>

        {/* "All" clear button */}
        <Link
          href={`/${locale}/tools`}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            !activeCountry
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'
          }`}
        >
          All
        </Link>

        {COUNTRY_LIST.map((c) => (
          <Link
            key={c.code}
            href={`/${locale}/tools?country=${c.code}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeCountry === c.code
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white border-gray-200 hover:border-gray-400'
            }`}
          >
            <span>{c.flag}</span>
            <span>{c.name}</span>
          </Link>
        ))}
      </div>

      {/* Active filter label */}
      {selectedCountryMeta && (
        <p className="text-sm text-gray-500 mb-6">
          Showing tools available in{' '}
          <strong className="text-gray-800">
            {selectedCountryMeta.flag} {selectedCountryMeta.name}
          </strong>
          {' '}·{' '}
          <Link href={`/${locale}/tools`} className="text-blue-600 hover:underline">
            Clear filter
          </Link>
        </p>
      )}

      {/* No results */}
      {visiblePillars.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          No tools available for this country yet.
        </div>
      )}

      {/* Pillars */}
      <div className="space-y-10">
        {visiblePillars.map(({ pillar, tools }) => {
          const meta = PILLAR_META[pillar]
          if (!meta) return null
          return (
            <section key={pillar}>
              <div className="flex items-center gap-2 mb-4">
                <span>{meta.icon}</span>
                <h2 className="text-sm font-medium text-gray-700">{meta.label}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tools.map((tool) => {
                  const isClickable = tool.status !== 'planned'
                  const cardClass = `block p-4 bg-white border rounded-xl transition-colors ${
                    meta.color
                  } ${
                    isClickable
                      ? 'hover:border-gray-300 cursor-pointer'
                      : 'opacity-60 cursor-default'
                  }`

                  const inner = (
                    <>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {t(tool.titleKey)}
                        </span>
                        <span
                          className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                            tool.status === 'live'
                              ? 'bg-green-100 text-green-700'
                              : tool.status === 'beta'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {tool.status === 'live' ? 'Live' : tool.status === 'beta' ? 'Beta' : 'Soon'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {tool.countries.slice(0, 5).map((cc) => {
                          const country = COUNTRY_LIST.find((c) => c.code === cc)
                          return (
                            <span key={cc} title={country?.name} className="text-sm">
                              {country?.flag}
                            </span>
                          )
                        })}
                        {tool.aiPowered && (
                          <span className="ml-auto text-xs text-blue-400">✦ AI</span>
                        )}
                      </div>
                    </>
                  )

                  return isClickable ? (
                    <Link
                      key={tool.id}
                      href={`/${locale}/tools/${tool.slug}`}
                      className={cardClass}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={tool.id} className={cardClass}>
                      {inner}
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Community & Places */}
      {!activeCountry && (
        <section className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span>🏘️</span>
            <h2 className="text-sm font-medium text-gray-700">Community & Places</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMMUNITY_PLACES.map((place) => (
              <Link
                key={place.path}
                href={`/${locale}${place.path}`}
                className={`block p-4 bg-white border rounded-xl transition-colors ${place.color}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{place.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-0.5">{place.name}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{place.description}</p>
                    <span className="text-xs px-2 py-0.5 bg-white border border-orange-200 rounded-full text-orange-600 font-medium">
                      {place.badge}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
