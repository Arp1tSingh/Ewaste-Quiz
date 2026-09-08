import React, { useMemo, useState } from 'react'
import { demoStudents, departments } from '../data/leaderboardData'
import { getLevel } from '../utils/level'
import type { UserData } from '../types'
import LeaderboardRow from '../components/LeaderboardRow'

interface LeaderboardProps {
  data: UserData
}

export default function Leaderboard({ data }: LeaderboardProps) {
  const [department, setDepartment] = useState('All Departments')

  const combined = useMemo(() => {
    const level = getLevel(data.points)
    const you = {
      name: data.profile?.fullName ?? 'You',
      department: data.profile?.department ?? 'Other',
      points: data.points,
      level: level.name,
      badgeCount: data.badgesUnlocked.length,
      isYou: true,
    }
    const all = [
      ...demoStudents.map((s) => ({ ...s, isYou: false })),
      you,
    ]
    return all
      .filter((s) => department === 'All Departments' || s.department === department)
      .sort((a, b) => b.points - a.points)
      .map((s, i) => ({ ...s, rank: i + 1 }))
  }, [data, department])

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">📊 Campus Eco Leaderboard</h1>
      <p className="mt-1 text-sm text-charcoal-light">See how you rank against your fellow eco champions.</p>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setDepartment(dept)}
            className={`focus-ring shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              department === dept ? 'bg-forest text-white' : 'bg-white text-charcoal-light hover:bg-mint/30'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="mt-5 hidden grid-cols-[2.5rem_1.5fr_1fr_5rem_4rem] gap-3 px-4 text-[11px] font-semibold uppercase tracking-wide text-charcoal-light sm:grid">
        <span>Rank</span>
        <span>Student</span>
        <span>Department</span>
        <span>Eco Level</span>
        <span className="text-right">Points</span>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {combined.map((s) => (
          <LeaderboardRow
            key={`${s.name}-${s.rank}`}
            rank={s.rank}
            name={s.name}
            department={s.department}
            level={s.level}
            points={s.points}
            badgeCount={s.badgeCount}
            isCurrentUser={s.isYou}
          />
        ))}
      </div>
    </div>
  )
}
