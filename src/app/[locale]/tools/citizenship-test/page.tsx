'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  buildMockTest,
  buildPracticeSet,
  GERMAN_STATES,
  CATEGORY_LABELS,
  QUESTION_COUNTS,
} from '@/lib/engines/citizenship-test'
import type { CitizenshipQuestion, GermanState, FilterCategory } from '@/types'

// ── Types ─────────────────────────────────────────────────────────────────────

type Screen = 'setup' | 'quiz' | 'results'
type Mode   = 'mock' | 'practice'

interface QuizState {
  questions:      CitizenshipQuestion[]
  userAnswers:    (number | null)[]
  revealed:       boolean[]
  currentIndex:   number
  mode:           Mode
  wrongQuestions: CitizenshipQuestion[] | null
}

// ── Category filter pills ─────────────────────────────────────────────────────

const FILTER_CATEGORIES: FilterCategory[] = [
  'all', 'Demokratie', 'Grundrechte', 'Geschichte', 'Gesellschaft', 'Staat', 'state',
]

// ── Option key labels ─────────────────────────────────────────────────────────

const KEYS = ['A', 'B', 'C', 'D']

// ── Small helpers ─────────────────────────────────────────────────────────────

function initQuiz(questions: CitizenshipQuestion[], mode: Mode): QuizState {
  return {
    questions,
    userAnswers:    new Array(questions.length).fill(null),
    revealed:       new Array(questions.length).fill(false),
    currentIndex:   0,
    mode,
    wrongQuestions: null,
  }
}

// ── Dot map dot ───────────────────────────────────────────────────────────────

function Dot({
  index, current, answer, revealed, correct, onClick,
}: {
  index: number; current: boolean; answer: number | null
  revealed: boolean; correct: number; onClick: () => void
}) {
  let cls = 'w-7 h-7 rounded-full border-2 text-[11px] font-bold flex items-center justify-center cursor-pointer transition-all '

  if (current) {
    cls += 'border-amber-400 bg-amber-400 text-black'
  } else if (revealed && answer !== null) {
    cls += answer === correct
      ? 'border-green-600 bg-green-600 text-white'
      : 'border-red-600 bg-red-600 text-white'
  } else if (answer !== null) {
    cls += 'border-gray-400 bg-gray-200 text-gray-700'
  } else {
    cls += 'border-gray-200 bg-white text-gray-400 hover:border-amber-400'
  }

  return (
    <button type="button" className={cls} onClick={onClick} aria-label={`Question ${index + 1}`}>
      {index + 1}
    </button>
  )
}

// ── Setup screen ──────────────────────────────────────────────────────────────

function SetupScreen({
  state, onStateChange, onMockTest, onPractice, activeFilter, onFilterChange,
}: {
  state: GermanState
  onStateChange: (s: GermanState) => void
  onMockTest: () => void
  onPractice: (cat: FilterCategory) => void
  activeFilter: FilterCategory
  onFilterChange: (cat: FilterCategory) => void
}) {
  const [showPracticeFilters, setShowPracticeFilters] = useState(false)

  return (
    <div className="space-y-6">

      {/* State selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span>📍</span> Your federal state (Bundesland)
        </h2>
        <select
          value={state}
          onChange={(e) => onStateChange(e.target.value as GermanState)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-colors"
        >
          {GERMAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <p className="mt-2 text-xs text-gray-400">
          Selects the 3 state-specific questions included in the mock exam.
        </p>
      </div>

      {/* Mode selection */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span>🎯</span> Choose a mode
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">

          {/* Mock test */}
          <button
            type="button"
            onClick={() => { setShowPracticeFilters(false); onMockTest() }}
            className="flex items-start gap-4 p-5 bg-white border-2 border-red-200 rounded-2xl text-left hover:border-red-500 hover:bg-red-50 transition-all group"
          >
            <span className="text-3xl mt-0.5" aria-hidden="true">📝</span>
            <div>
              <div className="text-base font-bold text-gray-900 group-hover:text-red-700 mb-1">
                Mock exam
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                33 questions · 30 general + 3 state<br />
                Pass: 17 correct · 60 minutes
              </div>
            </div>
          </button>

          {/* Practice */}
          <button
            type="button"
            onClick={() => setShowPracticeFilters(true)}
            className="flex items-start gap-4 p-5 bg-white border-2 border-amber-200 rounded-2xl text-left hover:border-amber-500 hover:bg-amber-50 transition-all group"
          >
            <span className="text-3xl mt-0.5" aria-hidden="true">📚</span>
            <div>
              <div className="text-base font-bold text-gray-900 group-hover:text-amber-700 mb-1">
                Practice mode
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Browse all {QUESTION_COUNTS.general} questions<br />
                Filter by category · instant answers
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Practice category filter */}
      {showPracticeFilters && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span>🗂️</span> Filter by category
          </h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange(cat)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? 'bg-amber-400 border-amber-500 text-black'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onPractice(activeFilter)}
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            Start practice →
          </button>
        </div>
      )}

      {/* Info */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>ℹ️</span> About this test
        </h2>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span>
              <strong className="text-gray-700">310 questions</strong> total — 300 general + 10 state-specific per Bundesland
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span>
              Official exam: <strong className="text-gray-700">33 questions</strong>, pass with{' '}
              <strong className="text-gray-700">17 correct</strong> (≈ 51.5%)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span>Questions are in German — that is the official exam language</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span>
              Official source:{' '}
              <a
                href="https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/Einbuergerungstest/einbuergerungstest-node.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                BAMF Einbürgerungstest ↗
              </a>
            </span>
          </li>
        </ul>
      </div>

    </div>
  )
}

// ── Results screen ────────────────────────────────────────────────────────────

function ResultsScreen({
  quiz, onRestart, onRetryWrong,
}: {
  quiz: QuizState
  onRestart: () => void
  onRetryWrong: () => void
}) {
  const { questions, userAnswers, mode } = quiz

  let correct = 0, wrong = 0, skipped = 0
  const wrongItems: { q: CitizenshipQuestion; userAnswer: number | null }[] = []

  questions.forEach((q, i) => {
    if (userAnswers[i] === null) {
      skipped++
      wrongItems.push({ q, userAnswer: null })
    } else if (userAnswers[i] === q.correctIndex) {
      correct++
    } else {
      wrong++
      wrongItems.push({ q, userAnswer: userAnswers[i] })
    }
  })

  const total        = questions.length
  const passThreshold = mode === 'mock' ? QUESTION_COUNTS.mockPass : Math.ceil(total * 0.5)
  const passed       = correct >= passThreshold
  const pct          = Math.round((correct / total) * 100)

  return (
    <div className="space-y-6">

      {/* Hero result */}
      <div className={`p-8 rounded-2xl text-center border-2 ${
        passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className="text-5xl mb-3">{passed ? '🎉' : '📖'}</div>
        <div className={`text-2xl font-bold mb-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {passed ? 'Passed! Congratulations ✓' : 'Not passed — keep practising'}
        </div>
        <div className={`text-5xl font-black my-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {correct}/{total}
        </div>
        <p className="text-sm text-gray-500 mb-4">{pct}% correct</p>
        <div className="max-w-xs mx-auto">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${passed ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {mode === 'mock' && (
            <p className="text-xs text-gray-400 mt-1 text-center">
              Pass line: {QUESTION_COUNTS.mockPass}/{QUESTION_COUNTS.mockTotal} (≈ 51.5%)
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { value: correct,  label: '✅ Correct',    color: 'text-green-600' },
          { value: wrong,    label: '❌ Wrong',       color: 'text-red-600' },
          { value: skipped,  label: '⏭ Skipped',     color: 'text-amber-600' },
          { value: total,    label: '📋 Total',       color: 'text-gray-900' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Wrong-answer review */}
      {wrongItems.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
          <p className="text-2xl mb-2">🎊</p>
          <p className="font-semibold text-gray-700">Perfect score — all correct!</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">❌ Wrong answers</h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
              {wrongItems.length}
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {wrongItems.map(({ q, userAnswer }, idx) => (
              <div key={idx} className="px-6 py-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                  Question {q.id}
                </p>
                <p className="text-sm font-medium text-gray-800 mb-3 leading-relaxed">{q.question}</p>
                <div className="space-y-1">
                  {userAnswer !== null ? (
                    <p className="text-sm text-red-600">
                      ❌ Your answer: {KEYS[userAnswer]}. {q.options[userAnswer]}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">⏭ Not answered</p>
                  )}
                  <p className="text-sm text-green-700">
                    ✅ Correct: {KEYS[q.correctIndex]}. {q.options[q.correctIndex]}
                  </p>
                </div>
                {q.explanation_zh && (
                  <p className="mt-3 text-xs text-blue-800 bg-blue-50 rounded-lg px-3 py-2 leading-relaxed">
                    💡 {q.explanation_zh}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
        >
          🔄 Start over
        </button>
        {wrongItems.length > 0 && (
          <button
            type="button"
            onClick={onRetryWrong}
            className="px-6 py-3 bg-amber-400 text-black border-2 border-amber-500 rounded-xl font-semibold hover:bg-amber-300 transition-colors"
          >
            📖 Practise wrong answers
          </button>
        )}
      </div>

    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CitizenshipTestPage() {
  const pathname = usePathname()
  const locale   = pathname.split('/')[1] || 'en'

  const [screen,       setScreen]       = useState<Screen>('setup')
  const [selectedState, setSelectedState] = useState<GermanState>('Baden-Württemberg')
  const [activeFilter,  setActiveFilter]  = useState<FilterCategory>('all')
  const [quiz,          setQuiz]          = useState<QuizState | null>(null)

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const updateQuiz = useCallback((updater: (q: QuizState) => QuizState) => {
    setQuiz((prev) => (prev ? updater(prev) : prev))
  }, [])

  // ── Start handlers ───────────────────────────────────────────────────────────

  function startMock() {
    const qs = buildMockTest(selectedState)
    setQuiz(initQuiz(qs, 'mock'))
    setScreen('quiz')
  }

  function startPractice(cat: FilterCategory) {
    const qs = buildPracticeSet(cat, selectedState)
    if (qs.length === 0) return
    setQuiz(initQuiz(qs, 'practice'))
    setScreen('quiz')
  }

  // ── Quiz actions ─────────────────────────────────────────────────────────────

  function handleAnswer(optIndex: number) {
    updateQuiz((q) => {
      if (q.revealed[q.currentIndex]) return q
      const answers = [...q.userAnswers]
      answers[q.currentIndex] = optIndex
      return { ...q, userAnswers: answers }
    })
  }

  function handleReveal() {
    updateQuiz((q) => {
      const revealed = [...q.revealed]
      revealed[q.currentIndex] = true
      return { ...q, revealed }
    })
  }

  function handleNext() {
    updateQuiz((q) =>
      q.currentIndex < q.questions.length - 1
        ? { ...q, currentIndex: q.currentIndex + 1 }
        : q,
    )
  }

  function handlePrev() {
    updateQuiz((q) =>
      q.currentIndex > 0
        ? { ...q, currentIndex: q.currentIndex - 1 }
        : q,
    )
  }

  function handleFinish() {
    if (!quiz) return
    // Collect wrong questions for retry
    const wrongQs = quiz.questions.filter(
      (_, i) => quiz.userAnswers[i] === null || quiz.userAnswers[i] !== quiz.questions[i].correctIndex,
    )
    setQuiz({ ...quiz, wrongQuestions: wrongQs })
    setScreen('results')
  }

  function handleExit() {
    const answered = quiz?.userAnswers.filter((a) => a !== null).length ?? 0
    if (answered > 0 && quiz?.mode === 'mock') {
      if (!confirm(`You have answered ${answered} questions. Exit and lose progress?`)) return
    }
    handleRestart()
  }

  function handleRestart() {
    setQuiz(null)
    setScreen('setup')
  }

  function handleRetryWrong() {
    if (!quiz?.wrongQuestions?.length) return
    setQuiz(initQuiz(quiz.wrongQuestions, 'practice'))
    setScreen('quiz')
  }

  // ── Jump to question (dot map) ────────────────────────────────────────────────

  // The Dot onClick needs to set currentIndex — pass a wrapper
  function handleJump(index: number) {
    updateQuiz((q) => ({ ...q, currentIndex: index }))
  }

  // Patch: Dot's onClick currently doesn't reach handleJump because
  // we pass the fn directly on the quiz state. Re-render the dot map with the real handler.

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 max-w-2xl mx-auto">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href={`/${locale}/tools`} className="hover:text-gray-700 transition-colors">
          ← All tools
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-8">
        {/* German flag stripe accent */}
        <div className="flex h-1.5 w-16 rounded-full overflow-hidden mb-4">
          <span className="flex-1 bg-black" />
          <span className="flex-1 bg-red-600" />
          <span className="flex-1 bg-amber-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
          🇩🇪 Einbürgerungstest
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          German citizenship test trainer · {QUESTION_COUNTS.general} questions · 16 states
        </p>
      </div>

      {/* Screens */}
      {screen === 'setup' && (
        <SetupScreen
          state={selectedState}
          onStateChange={setSelectedState}
          onMockTest={startMock}
          onPractice={startPractice}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      )}

      {screen === 'quiz' && quiz && (
        <QuizScreenWrapper
          quiz={quiz}
          onAnswer={handleAnswer}
          onReveal={handleReveal}
          onNext={handleNext}
          onPrev={handlePrev}
          onFinish={handleFinish}
          onExit={handleExit}
          onJump={handleJump}
        />
      )}

      {screen === 'results' && quiz && (
        <ResultsScreen
          quiz={quiz}
          onRestart={handleRestart}
          onRetryWrong={handleRetryWrong}
        />
      )}

      {/* Disclaimer */}
      <p className="mt-10 text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        ⚠️ <strong className="font-medium text-gray-600">Practice tool only.</strong>{' '}
        Official test administered by{' '}
        <a
          href="https://www.bamf.de"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700"
        >
          BAMF
        </a>
        . Questions sourced from the official public question catalogue.
      </p>
    </main>
  )
}

// ── QuizScreenWrapper — bridges jump handler into dot map ─────────────────────

function QuizScreenWrapper({
  quiz, onAnswer, onReveal, onNext, onPrev, onFinish, onExit, onJump,
}: {
  quiz: QuizState
  onAnswer: (i: number) => void
  onReveal: () => void
  onNext: () => void
  onPrev: () => void
  onFinish: () => void
  onExit: () => void
  onJump: (i: number) => void
}) {
  const { questions, userAnswers, revealed, currentIndex, mode } = quiz
  const q      = questions[currentIndex]
  const total  = questions.length
  const isLast = currentIndex === total - 1

  const answeredCount = userAnswers.filter((a) => a !== null).length
  const pct           = Math.round((answeredCount / total) * 100)
  const isRevealed    = revealed[currentIndex]
  const userAnswer    = userAnswers[currentIndex]

  const categoryLabel: Record<string, string> = {
    Demokratie:   'Democracy',
    Grundrechte:  'Fundamental rights',
    Geschichte:   'History',
    Gesellschaft: 'Society',
    Staat:        'State',
    state:        'State question',
  }

  return (
    <div className="space-y-4">

      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
          mode === 'mock'
            ? 'bg-red-100 text-red-700 border border-red-200'
            : 'bg-amber-100 text-amber-700 border border-amber-200'
        }`}>
          {mode === 'mock' ? '📝 Mock exam' : '📚 Practice'}
        </span>
        <span className="text-sm text-gray-500">
          Question <strong className="text-gray-900">{currentIndex + 1}</strong> of{' '}
          <strong className="text-gray-900">{total}</strong>
        </span>
        <button
          type="button"
          onClick={onExit}
          className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-400 hover:border-red-300 hover:text-red-500 transition-colors"
        >
          ✕ Exit
        </button>
      </div>

      {/* Progress */}
      <div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{answeredCount} answered</span>
          <span>{pct}%</span>
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="bg-amber-400 text-black text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
              #{q.id}
            </span>
            {q.category && (
              <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full shrink-0">
                {categoryLabel[q.category] ?? q.category}
              </span>
            )}
          </div>
          <p className="text-base leading-relaxed font-medium">{q.question}</p>
        </div>

        <ul className="p-4 space-y-2">
          {q.options.map((opt, i) => {
            let cls = 'flex items-start gap-3 p-3 border-2 rounded-xl text-sm leading-relaxed transition-all '

            if (isRevealed) {
              if (i === q.correctIndex) {
                cls += 'border-green-500 bg-green-50 cursor-default'
              } else if (i === userAnswer && userAnswer !== q.correctIndex) {
                cls += 'border-red-500 bg-red-50 cursor-default'
              } else {
                cls += 'border-gray-100 bg-white opacity-60 cursor-default'
              }
            } else if (userAnswer === i) {
              cls += 'border-amber-400 bg-amber-50 cursor-pointer'
            } else {
              cls += 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50 cursor-pointer'
            }

            const keyBg = isRevealed
              ? i === q.correctIndex
                ? 'bg-green-500 border-green-500 text-white'
                : i === userAnswer && userAnswer !== q.correctIndex
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-gray-100 border-gray-200 text-gray-400'
              : userAnswer === i
                ? 'bg-amber-400 border-amber-400 text-black'
                : 'bg-gray-50 border-gray-200 text-gray-500'

            return (
              <li key={i}>
                <label className={cls}>
                  <input
                    type="radio"
                    name="option"
                    value={i}
                    checked={userAnswer === i}
                    disabled={isRevealed}
                    onChange={() => !isRevealed && onAnswer(i)}
                    className="sr-only"
                  />
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-bold shrink-0 mt-0.5 ${keyBg}`}>
                    {KEYS[i]}
                  </span>
                  <span className="flex-1">{opt}</span>
                </label>
              </li>
            )
          })}
        </ul>

        {isRevealed && q.explanation_zh && (
          <div className="mx-4 mb-4 px-4 py-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
              💡 Explanation (中文)
            </p>
            <p className="text-sm text-blue-900 leading-relaxed">{q.explanation_zh}</p>
          </div>
        )}
      </div>

      {/* Dot map */}
      <div className="flex flex-wrap gap-1.5 p-4 bg-white border border-gray-100 rounded-xl">
        {questions.map((qDot, i) => (
          <Dot
            key={i}
            index={i}
            current={i === currentIndex}
            answer={userAnswers[i]}
            revealed={revealed[i]}
            correct={qDot.correctIndex}
            onClick={() => onJump(i)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-gray-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>

        {!isRevealed && (
          <button
            type="button"
            onClick={onReveal}
            className="px-4 py-2.5 bg-amber-400 border-2 border-amber-500 rounded-xl text-sm font-semibold text-black hover:bg-amber-300 transition-colors"
          >
            Show answer
          </button>
        )}

        <span className="flex-1" />

        {mode === 'mock' && isLast ? (
          <button
            type="button"
            onClick={onFinish}
            className="px-5 py-2.5 bg-red-600 border-2 border-red-600 rounded-xl text-sm font-bold text-white hover:bg-red-700 transition-colors"
          >
            Submit ✓
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={mode === 'practice' && isLast}
            className="px-4 py-2.5 bg-gray-900 border-2 border-gray-900 rounded-xl text-sm font-semibold text-white hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        )}
      </div>

    </div>
  )
}
