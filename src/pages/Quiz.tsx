import React, { useState, useRef, useEffect } from 'react'
import { quizQuestions } from '../data/quizData'
import { getLevel } from '../utils/level'
import Button from '../components/Button'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import Confetti from '../components/Confetti'
import type { Page } from '../types'

interface QuizProps {
  alreadyAwarded: boolean
  onFinish: (score: number, total: number, answers: number[]) => void
  onNavigate: (page: Page) => void
}

type Stage = 'question' | 'result'

export default function Quiz({ alreadyAwarded, onFinish, onNavigate }: QuizProps) {
  // Snapshot at mount time so the result screen doesn't relabel a first-time
  // completion as "already claimed" once the parent's data updates.
  const [wasAwardedBeforeThisRun] = useState(alreadyAwarded)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [stage, setStage] = useState<Stage>('question')
  const nextBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showExplanation && nextBtnRef.current) {
      setTimeout(() => {
        nextBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 50)
    }
  }, [showExplanation])

  const question = quizQuestions[index]
  const isLast = index === quizQuestions.length - 1

  function selectAnswer(optionIndex: number) {
    if (showExplanation) return
    setSelected(optionIndex)
    setShowExplanation(true)
  }

  function goNext() {
    const newAnswers = [...answers, selected !== null ? selected : -1]
    setAnswers(newAnswers)
    setSelected(null)
    setShowExplanation(false)

    if (isLast) {
      const score = newAnswers.reduce((acc, ans, i) => acc + (ans === quizQuestions[i].correctIndex ? 1 : 0), 0)
      onFinish(score, quizQuestions.length, newAnswers)
      setStage('result')
    } else {
      setIndex(index + 1)
    }
  }

  function retake() {
    setIndex(0)
    setSelected(null)
    setShowExplanation(false)
    setAnswers([])
    setStage('question')
  }

  if (stage === 'result') {
    const score = answers.reduce((acc, ans, i) => acc + (ans === quizQuestions[i].correctIndex ? 1 : 0), 0)
    const total = quizQuestions.length
    const percent = Math.round((score / total) * 100)
    const level = getLevel(score >= 8 ? 90 : score >= 5 ? 50 : 10)

    return (
      <div className="animate-fade-in flex flex-col items-center py-6 text-center">
        {!wasAwardedBeforeThisRun && <Confetti />}
        <div className="text-5xl">🎉</div>
        <h1 className="mt-3 font-display text-2xl font-bold text-forest-dark">Quiz Complete!</h1>
        <div className="mt-4 font-display text-4xl font-bold text-emerald-dark">
          {score} / {total}
        </div>
        <div className="mt-1 text-sm font-semibold text-charcoal-light">{percent}%</div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-mint/50 px-4 py-1.5 text-sm font-semibold text-forest-dark">
          {level.icon} {level.name.toUpperCase()}
        </div>
        <p className="mt-4 max-w-sm text-sm text-charcoal-light">
          You know your e-waste. Now turn that knowledge into action.
        </p>

        <Card className="mt-6 w-full max-w-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal-light">Correct answers</span>
            <span className="font-semibold text-emerald-dark">{score}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-charcoal-light">Incorrect answers</span>
            <span className="font-semibold text-red-500">{total - score}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-charcoal-light">Percentage</span>
            <span className="font-semibold text-forest-dark">{percent}%</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-charcoal-light">Points earned</span>
            <span className="font-semibold text-amber-500">{wasAwardedBeforeThisRun ? '+0 (already claimed)' : '+20 ECO POINTS'}</span>
          </div>
        </Card>

        <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          <Button fullWidth onClick={() => onNavigate('passport')}>
            Continue to Passport
          </Button>
          <Button fullWidth variant="secondary" onClick={() => onNavigate('badges')}>
            View My Badges
          </Button>
        </div>
        <button onClick={retake} className="focus-ring mt-4 text-xs font-semibold text-charcoal-light underline">
          Retake Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-dark">
          Question {index + 1} / {quizQuestions.length}
        </span>
        <span className="text-xs font-medium text-charcoal-light">🧠 E-Waste Quiz</span>
      </div>
      <ProgressBar percent={((index + (showExplanation ? 1 : 0)) / quizQuestions.length) * 100} />

      <Card className="mt-6">
        <h2 className="font-display text-lg font-semibold leading-snug text-forest-dark sm:text-xl">
          {question.question}
        </h2>
        <div className="mt-5 flex flex-col gap-3">
          {question.options.map((option, i) => {
            const isSelected = selected === i
            const isCorrect = i === question.correctIndex
            let stateClasses = 'border-forest/10 bg-offwhite hover:border-emerald/40'
            if (showExplanation) {
              if (isCorrect) stateClasses = 'border-emerald bg-emerald/10'
              else if (isSelected && !isCorrect) stateClasses = 'border-red-400 bg-red-50'
              else stateClasses = 'border-forest/10 bg-offwhite opacity-60'
            } else if (isSelected) {
              stateClasses = 'border-emerald bg-emerald/10'
            }
            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                disabled={showExplanation}
                className={`focus-ring flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium text-charcoal transition-colors ${stateClasses}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-forest/20 text-xs font-bold text-forest-dark">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="animate-slide-up mt-5 rounded-2xl bg-mint/30 p-4 text-sm text-forest-dark">
            <span className="font-semibold">{selected === question.correctIndex ? 'Correct! ' : 'Not quite. '}</span>
            {question.explanation}
          </div>
        )}

        <div className="mt-6 flex justify-end" ref={nextBtnRef}>
          <Button variant={!showExplanation ? 'secondary' : 'primary'} onClick={goNext}>
            {!showExplanation ? 'Skip Question' : (isLast ? 'Finish Quiz' : 'Next Question')}
          </Button>
        </div>
      </Card>
    </div>
  )
}
