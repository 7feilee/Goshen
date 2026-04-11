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
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">All tools</h1>
        <p className="text-sm text-gray-500">
          {liveCount} live · {betaCount} in beta · {TOOLS.length - liveCount - betaCount} coming soon
        </p>
      </div>

      {/* ToolsGrid reads ?country= from the URL — requires Suspense for useSearchParams */}
      <Suspense>
        <ToolsGrid locale={locale} />
      </Suspense>
    </main>
  )
}
