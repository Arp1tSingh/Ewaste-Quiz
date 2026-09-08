import React from 'react'
import { badges } from '../data/badgesData'
import type { UserData } from '../types'
import BadgeCard from '../components/BadgeCard'

interface BadgesProps {
  data: UserData
}

export default function Badges({ data }: BadgesProps) {
  const unlockedMap = new Map(data.badgesUnlocked.map((b) => [b.id, b.unlockedAt]))

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">🏆 Badges</h1>
      <p className="mt-1 text-sm text-charcoal-light">
        You&apos;ve unlocked {data.badgesUnlocked.length} of {badges.length} badges.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {badges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            unlocked={unlockedMap.has(badge.id)}
            unlockedAt={unlockedMap.get(badge.id)}
          />
        ))}
      </div>
    </div>
  )
}
