import React from 'react'
import type { Reward } from '../types'
import Button from './Button'

interface RewardCardProps {
  reward: Reward
  points: number
  redeemedCount: number
  onRedeem: (reward: Reward) => void
}

export default function RewardCard({ reward, points, redeemedCount, onRedeem }: RewardCardProps) {
  const canRedeem = points >= reward.cost
  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-card">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber/15 text-2xl">
        {reward.icon}
      </div>
      <div className="font-display text-base font-semibold text-forest-dark">{reward.name}</div>
      <p className="mt-1 flex-1 text-sm text-charcoal-light">{reward.description}</p>
      {redeemedCount > 0 && (
        <div className="mt-2 inline-flex w-fit items-center rounded-full bg-mint/40 px-2.5 py-0.5 text-[11px] font-semibold text-forest-dark">
          Redeemed ×{redeemedCount}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-sm font-semibold ${canRedeem ? 'text-emerald-dark' : 'text-charcoal-light'}`}>
          {canRedeem ? `${reward.cost} POINTS` : `${points} / ${reward.cost} POINTS`}
        </span>
        <Button size="sm" variant={canRedeem ? 'amber' : 'secondary'} disabled={!canRedeem} onClick={() => onRedeem(reward)}>
          {canRedeem ? 'Redeem' : 'Locked'}
        </Button>
      </div>
    </div>
  )
}
