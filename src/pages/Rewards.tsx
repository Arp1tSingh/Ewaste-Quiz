import React, { useState } from 'react'
import { rewards } from '../data/rewardsData'
import type { Reward, UserData } from '../types'
import RewardCard from '../components/RewardCard'
import Modal from '../components/Modal'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'

interface RewardsProps {
  data: UserData
  onRedeem: (reward: Reward) => string | null
}

export default function Rewards({ data, onRedeem }: RewardsProps) {
  const [modalCode, setModalCode] = useState<string | null>(null)
  const [showMyRewards, setShowMyRewards] = useState(false)

  function handleRedeem(reward: Reward) {
    const code = onRedeem(reward)
    if (code) setModalCode(code)
  }

  const countFor = (id: string) => data.rewardsRedeemed.filter((r) => r.rewardId === id).length

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">🎁 Reward Center</h1>
          <p className="mt-1 text-sm text-charcoal-light">You have {data.points} Eco Points to spend.</p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => setShowMyRewards(true)}>
          View My Rewards
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            points={data.points}
            redeemedCount={countFor(reward.id)}
            onRedeem={handleRedeem}
          />
        ))}
      </div>

      <Modal open={modalCode !== null} onClose={() => setModalCode(null)}>
        <div className="text-center">
          <div className="text-4xl">🎉</div>
          <h2 className="mt-3 font-display text-lg font-bold text-forest-dark">Reward Unlocked!</h2>
          <div className="mt-4 rounded-2xl bg-mint/40 px-4 py-3 font-display text-xl font-bold tracking-wider text-forest-dark">
            {modalCode}
          </div>
          <p className="mt-3 text-xs text-charcoal-light">Show this code at the campus rewards desk to claim it.</p>
          <Button fullWidth className="mt-5" onClick={() => setModalCode(null)}>
            Done
          </Button>
        </div>
      </Modal>

      <Modal open={showMyRewards} onClose={() => setShowMyRewards(false)} size="md">
        <h2 className="font-display text-lg font-bold text-forest-dark">My Rewards</h2>
        {data.rewardsRedeemed.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              icon="🎁"
              title="No rewards redeemed yet"
              message="Your eco journey starts with one small action."
              actionLabel="Explore Rewards"
              onAction={() => setShowMyRewards(false)}
            />
          </div>
        ) : (
          <div className="mt-4 flex max-h-80 flex-col gap-3 overflow-y-auto">
            {[...data.rewardsRedeemed].reverse().map((r) => {
              const reward = rewards.find((rw) => rw.id === r.rewardId)
              return (
                <div key={r.id} className="flex items-center justify-between rounded-2xl bg-offwhite px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-charcoal">
                      {reward?.icon} {reward?.name}
                    </div>
                    <div className="text-[11px] text-charcoal-light">{new Date(r.redeemedAt).toLocaleString()}</div>
                  </div>
                  <div className="font-display text-sm font-bold text-emerald-dark">{r.code}</div>
                </div>
              )
            })}
          </div>
        )}
        <Button fullWidth variant="secondary" className="mt-5" onClick={() => setShowMyRewards(false)}>
          Close
        </Button>
      </Modal>
    </div>
  )
}
