import React from 'react'

interface LeaderboardRowProps {
  rank: number
  name: string
  department: string
  level: string
  points: number
  badgeCount: number
  isCurrentUser?: boolean
}

const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function LeaderboardRow({ rank, name, department, level, points, badgeCount, isCurrentUser }: LeaderboardRowProps) {
  return (
    <div
      className={`grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-2xl px-4 py-3 sm:grid-cols-[2.5rem_1.5fr_1fr_5rem_4rem] ${
        isCurrentUser ? 'bg-emerald/10 ring-2 ring-emerald/40' : 'bg-white'
      }`}
    >
      <div className="font-display text-sm font-bold text-forest-dark">{medals[rank] ?? `#${rank}`}</div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-charcoal">
          {name} {isCurrentUser && <span className="text-emerald-dark">(You)</span>}
        </div>
        <div className="truncate text-xs text-charcoal-light sm:hidden">{department}</div>
      </div>
      <div className="hidden truncate text-xs text-charcoal-light sm:block">{department}</div>
      <div className="hidden text-xs font-medium text-forest-light sm:block">{level}</div>
      <div className="text-right text-sm font-bold text-emerald-dark">{points}</div>
    </div>
  )
}
