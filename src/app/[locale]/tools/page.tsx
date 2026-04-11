import Link from 'next/link'
import { TOOLS, TOOLS_BY_PILLAR } from '@/lib/data/tools'
import { COUNTRY_LIST } from '@/lib/data/countries'

const PILLAR_META: Record<string, { icon: string; color: string }> = {
  visa:     { icon: '🛂', color: 'bg-blue-50 border-blue-100' },
  language: { icon: '💬', color: 'bg-teal-50 border-teal-100' },
  family:   { icon: '👨‍👩‍👧', color: 'bg-purple-50 border-purple-100' },
  assets:   { icon: '💰', color: 'bg-amber-50 border-amber-100' },
  work:     { icon: '⚖️', color: 'bg-rose-50 border-rose-100' },
  business: { icon: '🏢', color: 'bg-green-50 border-green-100' },
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const liveCount = TOOLS.filter((t) => t.status === 'live').length
  const betaCount = TOOLS.filter((t) => t.status === 'beta').length

  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">All tools</h1>
        <p className="text-sm text-gray-500">
          {liveCount} live · {betaCount} in beta · {TOOLS.length - liveCount - betaCount} coming soon
        </p>
      </div>

      {/* Country filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="text-xs font-medium text-gray-400 self-center mr-1">
          Filter by country
        </span>
        {COUNTRY_LIST.map((c) => (
          <Link
            key={c.code}
            href={`/${locale}/tools?country=${c.code}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:border-gray-400 transition-colors"
          >
            <span>{c.flag}</span>
            <span>{c.name}</span>
          </Link>
        ))}
      </div>

      {/* Pillars */}
      <div className="space-y-10">
        {Object.entries(TOOLS_BY_PILLAR).map(([pillar, tools]) => {
          const meta = PILLAR_META[pillar]
          return (
            <section key={pillar}>
              <div className="flex items-center gap-2 mb-4">
                <span>{meta.icon}</span>
                <h2 className="text-sm font-medium text-gray-700 capitalize">
                  {pillar.replace('_', ' ')}
                </h2>
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
                          {tool.titleKey.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}
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
    </main>
  )
}
