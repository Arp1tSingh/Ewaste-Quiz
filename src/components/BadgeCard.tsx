import React from 'react'
import type { Badge } from '../types'

interface BadgeCardProps {
  badge: Badge
  unlocked: boolean
  unlockedAt?: string
}

export default function BadgeCard({ badge, unlocked, unlockedAt }: BadgeCardProps) {
  return (
    <div
      className={`relative rounded-3xl p-5 text-center shadow-card transition-transform duration-200 ${
        unlocked ? 'bg-white hover:-translate-y-1 hover:shadow-card-lg' : 'bg-white/60'
      }`}
    >
      <div
        className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${
          unlocked ? 'bg-mint/50 animate-glow' : 'bg-charcoal/5 grayscale'
        }`}
      >
        {unlocked ? badge.icon : '🔒'}
      </div>
      <div className={`font-display text-sm font-semibold ${unlocked ? 'text-forest-dark' : 'text-charcoal-light'}`}>
        {badge.name}
      </div>
      <p className="mt-1 text-xs text-charcoal-light">{unlocked ? badge.description : badge.requirement}</p>
      {unlocked && unlockedAt && (
        <div className="mt-2 text-[11px] font-medium text-emerald-dark">
          Unlocked {new Date(unlockedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}
