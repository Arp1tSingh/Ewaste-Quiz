import React from 'react'
import { missions } from '../data/missionsData'
import type { UserData } from '../types'
import Button from '../components/Button'

interface MissionsProps {
  data: UserData
  onComplete: (missionId: string, points: number) => void
}

export default function Missions({ data, onComplete }: MissionsProps) {
  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">♻️ Eco Missions</h1>
      <p className="mt-1 text-sm text-charcoal-light">Complete missions to earn Eco Points and unlock badges.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {missions.map((mission) => {
          const done = data.missionsCompleted.includes(mission.id)
          return (
            <div
              key={mission.id}
              className={`flex flex-col rounded-3xl p-6 shadow-card transition-colors ${
                done ? 'bg-mint/25' : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                    done ? 'bg-emerald/20' : 'bg-mint/40'
                  }`}
                >
                  {mission.icon}
                </div>
                <div className="flex-1">
                  <div className="font-display text-sm font-semibold text-forest-dark">{mission.title}</div>
                  <p className="mt-1 text-sm text-charcoal-light">{mission.description}</p>
                  <div className="mt-2 text-xs font-bold text-amber-500">+{mission.points} points</div>
                </div>
              </div>
              <div className="mt-4">
                {done ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald/20 px-3 py-1.5 text-xs font-bold text-emerald-dark">
                    ✓ Completed
                  </span>
                ) : (
                  <Button size="sm" onClick={() => onComplete(mission.id, mission.points)}>
                    Mark as Done
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
