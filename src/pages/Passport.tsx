import React from 'react'
import type { UserData } from '../types'
import { getLevel } from '../utils/level'
import { badges } from '../data/badgesData'
import { currentMission } from '../data/missionsData'

interface PassportProps {
  data: UserData
}

export default function Passport({ data }: PassportProps) {
  const level = getLevel(data.points)
  const unlockedBadgeIds = new Set(data.badgesUnlocked.map((b) => b.id))

  const milestones = [
    { label: 'Joined Campaign', done: true },
    { label: 'Created Profile', done: !!data.profile },
    { label: 'Completed Awareness Quiz', done: data.quiz.completed },
    { label: 'Earned First Badge', done: data.badgesUnlocked.length > 0 },
    { label: 'Completed Eco Mission', done: data.missionsCompleted.includes(currentMission.id) || data.missionsCompleted.length > 0 },
    { label: 'Reach Green Warrior', done: data.points >= 75 },
    { label: 'Become Eco Champion', done: data.points >= 150 },
  ]

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">🪪 My Scorecard</h1>
      <p className="mt-1 text-sm text-charcoal-light">Your official digital identity for Campaign 2026.</p>

      <div className="mx-auto mt-6 max-w-md rounded-3xl bg-gradient-to-br from-forest to-forest-dark p-6 text-white shadow-card-lg">
        <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-mint">
          <span>E-WASTE QUIZ</span>
          <span>CAMPAIGN 2026</span>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">🎓</div>
          <div>
            <div className="font-display text-lg font-bold">{data.profile?.fullName ?? '—'}</div>
            <div className="text-xs text-mint/80">Scorecard ID · {data.passportId}</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-[11px] text-mint/80">Student ID</div>
            <div className="font-semibold">{data.profile?.studentId ?? '—'}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-[11px] text-mint/80">Department</div>
            <div className="font-semibold">{data.profile?.department ?? '—'}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-[11px] text-mint/80">Eco Level</div>
            <div className="font-semibold">{level.icon} {level.name}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-[11px] text-mint/80">Eco Points</div>
            <div className="font-semibold">{data.points} XP</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-[11px] text-mint/80">Quiz Score</div>
            <div className="font-semibold">{data.quiz.completed ? `${data.quiz.score}/${data.quiz.total}` : 'Not taken'}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-[11px] text-mint/80">Badges</div>
            <div className="font-semibold">{data.badgesUnlocked.length} / {badges.length}</div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
          <div className="text-[11px] text-mint/70">Scan at campus collection points</div>
          <div className="grid h-12 w-12 grid-cols-4 grid-rows-4 gap-[2px] rounded-md bg-white/90 p-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`${[0, 3, 5, 6, 9, 10, 12, 15].includes(i) ? 'bg-forest-dark' : 'bg-transparent'} rounded-[1px]`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <h2 className="font-display text-lg font-semibold text-forest-dark">My Eco Journey</h2>
        <div className="mt-4 flex flex-col gap-2">
          {milestones.map((m) => (
            <div
              key={m.label}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
                m.done ? 'bg-emerald/10 text-forest-dark' : 'bg-white text-charcoal-light/70'
              }`}
            >
              <span>{m.done ? '✓' : '🔒'}</span>
              {m.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
