import { getTranslations } from 'next-intl/server'
import { TOOLS_BY_PILLAR } from '@/lib/data/tools'
import { COUNTRY_LIST } from '@/lib/data/countries'
import Link from 'next/link'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()

  return (
    <main className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:py-28 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
          {t('home.hero.title')}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('home.hero.subtitle')}
        </p>
        <Link
          href={`/${locale}/tools`}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-700 transition-colors shadow-sm"
        >
          {t('home.hero.cta')}
          <span aria-hidden="true">→</span>
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {[
            { value: '280M', label: t('home.hero.stats.immigrants') },
            { value: '25+',  label: t('home.hero.stats.tools') },
            { value: '5',    label: t('home.hero.stats.countries') },
            { value: '15',   label: t('home.hero.stats.languages') },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-2xl p-5">
              <div className="text-4xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-sm text-gray-500 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live tools – start here ────────────────────────────────────────── */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Start here</h2>
        <p className="text-base text-gray-500 mb-8">
          These tools are live, free, and work in your browser — no account needed.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Visa Finder card */}
          <Link
            href={`/${locale}/tools/visa-finder`}
            className="group block p-7 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-400 hover:bg-blue-100 transition-all"
          >
            <div className="text-4xl mb-4" aria-hidden="true">🛂</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Visa pathway finder
            </h3>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              Tell us your origin country, destination, and purpose. We&apos;ll show
              every visa route available — requirements, processing time, fees,
              and the path to permanent residence.
            </p>
            <span className="inline-flex items-center gap-1 text-blue-700 font-semibold text-base group-hover:gap-2 transition-all">
              Find your visa <span aria-hidden="true">→</span>
            </span>
          </Link>

          {/* Letter Decoder card */}
          <Link
            href={`/${locale}/tools/letter-decoder`}
            className="group block p-7 bg-teal-50 border-2 border-teal-100 rounded-2xl hover:border-teal-400 hover:bg-teal-100 transition-all"
          >
            <div className="text-4xl mb-4" aria-hidden="true">📄</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Official letter decoder
            </h3>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              Confused by a government or immigration letter? Paste it in and get
              a structured breakdown: what it means, key deadlines, reference
              numbers, and what you need to do.
            </p>
            <span className="inline-flex items-center gap-1 text-teal-700 font-semibold text-base group-hover:gap-2 transition-all">
              Decode a letter <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ── Countries ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {t('nav.countries')}
        </h2>
        <div className="flex flex-wrap gap-3">
          {COUNTRY_LIST.map((c) => (
            <Link
              key={c.code}
              href={`/${locale}/tools?country=${c.code}`}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <span className="text-2xl" aria-hidden="true">{c.flag}</span>
              <span className="text-gray-900">{c.name}</span>
              <span className="text-gray-400 text-xs">{c.immigrantCount}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── All tools by pillar ───────────────────────────────────────────── */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          {t('nav.tools')}
        </h2>
        <div className="space-y-10">
          {Object.entries(TOOLS_BY_PILLAR).map(([pillar, tools]) => (
            <div key={pillar}>
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                {t(`pillars.${pillar}`)}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {tools.map((tool) =>
                  tool.status === 'planned' ? (
                    /* Non-interactive card for planned tools */
                    <div
                      key={tool.id}
                      className="p-5 bg-white border border-gray-100 rounded-xl opacity-55"
                      aria-label={`${t(tool.titleKey)} — coming soon`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-base font-semibold text-gray-900">
                          {t(tool.titleKey)}
                        </span>
                        <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                          {t('common.status.planned')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{t(tool.descriptionKey)}</p>
                    </div>
                  ) : (
                    <Link
                      key={tool.id}
                      href={`/${locale}/tools/${tool.slug}`}
                      className="group block p-5 bg-white border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {t(tool.titleKey)}
                        </span>
                        <span
                          className={`shrink-0 text-xs px-2 py-1 rounded-full border font-medium ${
                            tool.status === 'live'
                              ? 'bg-green-50 text-green-700 border-green-100'
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}
                        >
                          {t(`common.status.${tool.status}`)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{t(tool.descriptionKey)}</p>
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="px-6 py-14 max-w-5xl mx-auto border-t border-gray-100 mt-6 flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-gray-400">{t('common.openSource')}</p>
        <a
          href="https://github.com/7feilee/Goshen"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('common.contributeOnGitHub')} →
        </a>
      </footer>
    </main>
  )
}
