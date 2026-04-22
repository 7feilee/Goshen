import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { TOOLS } from '@/lib/data/tools'
import ToolsGrid from './_components/tools-grid'

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const liveCount = TOOLS.filter((t) => t.status === 'live').length
  const betaCount = TOOLS.filter((t) => t.status === 'beta').length

  return (
    <main className="min-h-screen">

      {/* Header */}
      <div className="px-6 pt-12 pb-8 max-w-4xl mx-auto border-b border-gray-100">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">All tools</h1>
            <p className="text-sm text-gray-500">
              <span className="text-green-600 font-semibold">{liveCount} live</span>
              {betaCount > 0 && <> · <span className="text-amber-600 font-semibold">{betaCount} in beta</span></>}
              {' '}· {TOOLS.length - liveCount - betaCount} coming soon
            </p>
          </div>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Free, no account required. Filter by country to see what&apos;s available where you are.
          </p>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* ToolsGrid reads ?country= from the URL — requires Suspense for useSearchParams */}
        <Suspense>
          <ToolsGrid locale={locale} />
        </Suspense>
      </div>
    </main>
  )
}
