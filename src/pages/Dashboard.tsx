import React from 'react'
import type { UserData, Page } from '../types'
import { getLevel, getLevelProgress } from '../utils/level'
import { currentMission } from '../data/missionsData'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { demoStudents } from '../data/leaderboardData'

interface DashboardProps {
  data: UserData
  onNavigate: (page: Page) => void
  onCompleteCurrentMission: () => void
}

export default function Dashboard({ data, onNavigate, onCompleteCurrentMission }: DashboardProps) {
  const level = getLevel(data.points)
  const progress = getLevelProgress(data.points)
  const missionDone = data.missionsCompleted.includes(currentMission.id)

  const rank =
    [...demoStudents.map((s) => s.points), data.points]
      .sort((a, b) => b - a)
      .findIndex((p) => p === data.points) + 1

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">
        Welcome back, {data.profile?.fullName?.split(' ')[0] ?? 'Champion'} 👋
      </h1>
      <p className="mt-1 text-sm text-charcoal-light">Ready to make your electronics count?</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Eco Points" value={data.points} icon="⚡" />
        <StatCard label="Current Level" value={level.name} icon={level.icon} accent="bg-amber/15" />
        <StatCard
          label="Quiz Score"
          value={data.quiz.completed ? `${data.quiz.score}/${data.quiz.total}` : '—'}
          icon="🧠"
        />
        <StatCard label="Campus Rank" value={`#${rank}`} icon="📊" accent="bg-mint/50" />
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-semibold text-forest-dark">
            {level.icon} {level.name}
          </span>
          <span className="text-xs font-medium text-charcoal-light">
            {progress.current} / {progress.target === progress.current ? progress.current : progress.target} XP
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar percent={progress.percent} />
        </div>
      </Card>

      <Card highlighted className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint/50 text-2xl">
              {currentMission.icon}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-dark">Current Mission</div>
              <div className="mt-0.5 font-display text-base font-semibold text-forest-dark">{currentMission.title}</div>
              <p className="mt-1 max-w-md text-sm text-charcoal-light">{currentMission.description}</p>
              <div className="mt-2 text-xs font-bold text-amber-500">+{currentMission.points} Eco Points</div>
            </div>
          </div>
          <Button
            variant={missionDone ? 'secondary' : 'primary'}
            disabled={missionDone}
            onClick={onCompleteCurrentMission}
            className="shrink-0"
          >
            {missionDone ? '✓ Completed' : 'Complete Mission'}
          </Button>
        </div>
      </Card>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <button onClick={() => onNavigate('quiz')} className="focus-ring text-left">
          <Card hover className="h-full">
            <div className="text-2xl">🧠</div>
            <div className="mt-2 font-display text-sm font-semibold text-forest-dark">Take the Quiz</div>
            <p className="mt-1 text-xs text-charcoal-light">Test your e-waste knowledge and earn +20 points.</p>
          </Card>
        </button>
        <button onClick={() => onNavigate('missions')} className="focus-ring text-left">
          <Card hover className="h-full">
            <div className="text-2xl">♻️</div>
            <div className="mt-2 font-display text-sm font-semibold text-forest-dark">Eco Missions</div>
            <p className="mt-1 text-xs text-charcoal-light">Complete missions to boost your Eco Points.</p>
          </Card>
        </button>
        <button onClick={() => onNavigate('passport')} className="focus-ring text-left">
          <Card hover className="h-full">
            <div className="text-2xl">🪪</div>
            <div className="mt-2 font-display text-sm font-semibold text-forest-dark">My Passport</div>
            <p className="mt-1 text-xs text-charcoal-light">View your digital eco identity and journey.</p>
          </Card>
        </button>
      </div>
    </div>
  )
}
