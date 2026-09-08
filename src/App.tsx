import React, { useEffect, useRef, useState } from 'react'
import type { Page, Profile, Reward, ToastMessage, UserData } from './types'
import {
  getUserData,
  createProfile,
  updateProfile,
  completeMission,
  saveQuizResult,
  redeemReward,
  clearUserData,
  loadDemoData,
} from './utils/storage'
import { badges } from './data/badgesData'
import { currentMission } from './data/missionsData'

import AppLayout from './layouts/AppLayout'
import ToastContainer from './components/Toast'
import Confetti from './components/Confetti'

import Landing from './pages/Landing'
import ProfileSetup from './pages/ProfileSetup'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Missions from './pages/Missions'
import BadgesPage from './pages/Badges'
import Leaderboard from './pages/Leaderboard'
import Rewards from './pages/Rewards'
import Passport from './pages/Passport'
import Certificate from './pages/Certificate'
import ProfilePage from './pages/Profile'

export default function App() {
  const [data, setData] = useState<UserData | null>(null)
  const [page, setPage] = useState<Page>('landing')
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [confettiBurst, setConfettiBurst] = useState(0)
  const toastId = useRef(0)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const existing = getUserData()
    if (existing && existing.profile) {
      setData(existing)
      setPage('dashboard')
    }
    setInitialized(true)
  }, [])

  function pushToast(message: string, variant: ToastMessage['variant'] = 'success') {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message, variant }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }

  function fireConfetti() {
    setConfettiBurst((n) => n + 1)
    window.setTimeout(() => setConfettiBurst(0), 2200)
  }

  function applyUpdate(next: UserData) {
    const prevIds = new Set((data?.badgesUnlocked ?? []).map((b) => b.id))
    const newlyUnlocked = next.badgesUnlocked.filter((b) => !prevIds.has(b.id))
    setData(next)
    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((b) => {
        const badge = badges.find((bd) => bd.id === b.id)
        if (badge) pushToast(`🏆 New Badge Unlocked: ${badge.name}!`, 'success')
      })
      fireConfetti()
    }
  }

  function handleStart() {
    setPage('setup')
  }

  function handleCreateProfile(profile: Profile) {
    const created = createProfile(profile)
    setData(created)
    setPage('dashboard')
    pushToast(`Welcome, ${profile.fullName.split(' ')[0]}! Your passport is ready.`)
  }

  function handleDemo() {
    const demoProfile: Profile = {
      fullName: 'Demo Student',
      studentId: 'DEMO2026',
      department: 'Computer Engineering',
      year: '3rd Year',
    }
    const demo = loadDemoData(demoProfile)
    setData(demo)
    setPage('dashboard')
    pushToast('Demo experience loaded — explore freely!', 'info')
  }

  function handleCompleteCurrentMission() {
    const { data: next, awarded } = completeMission(currentMission.id, currentMission.points)
    if (awarded) {
      applyUpdate(next)
      pushToast(`+${currentMission.points} Eco Points earned!`)
    } else {
      setData(next)
    }
  }

  function handleCompleteMission(missionId: string, points: number) {
    const { data: next, awarded } = completeMission(missionId, points)
    if (awarded) {
      applyUpdate(next)
      pushToast(`+${points} Eco Points earned!`)
    } else {
      setData(next)
    }
  }

  function handleQuizFinish(score: number, total: number, answers: number[]) {
    const { data: next, awarded } = saveQuizResult(score, total, answers)
    applyUpdate(next)
    if (awarded) pushToast('+20 Eco Points for completing the quiz!')
  }

  function handleRedeem(reward: Reward): string | null {
    if (!data) return null
    const { data: next, redemption } = redeemReward(reward.id, reward.cost)
    if (!redemption) {
      pushToast('Not enough Eco Points for this reward.', 'error')
      return null
    }
    applyUpdate(next)
    pushToast(`Redeemed ${reward.name}!`)
    return redemption.code
  }

  function handleUpdateProfile(profile: Profile) {
    const next = updateProfile(profile)
    setData(next)
    pushToast('Profile updated.')
  }

  function handleReset() {
    clearUserData()
    setData(null)
    setPage('setup')
    pushToast('Your passport has been reset.', 'info')
  }

  if (!initialized) return null

  if (page === 'landing' || !data) {
    return (
      <>
        <ToastContainer toasts={toasts} />
        <Landing onStart={handleStart} />
      </>
    )
  }

  if (page === 'setup') {
    return (
      <>
        <ToastContainer toasts={toasts} />
        <ProfileSetup onCreate={handleCreateProfile} onDemo={handleDemo} />
      </>
    )
  }

  return (
    <>
      <ToastContainer toasts={toasts} />
      {confettiBurst > 0 && <Confetti />}
      <AppLayout page={page} onNavigate={setPage}>
        {page === 'dashboard' && (
          <Dashboard data={data} onNavigate={setPage} onCompleteCurrentMission={handleCompleteCurrentMission} />
        )}
        {page === 'quiz' && (
          <Quiz alreadyAwarded={data.quiz.pointsAwarded} onFinish={handleQuizFinish} onNavigate={setPage} />
        )}
        {page === 'missions' && <Missions data={data} onComplete={handleCompleteMission} />}
        {page === 'badges' && <BadgesPage data={data} />}
        {page === 'leaderboard' && <Leaderboard data={data} />}
        {page === 'rewards' && <Rewards data={data} onRedeem={handleRedeem} />}
        {page === 'passport' && <Passport data={data} />}
        {page === 'certificate' && <Certificate data={data} />}
        {page === 'profile' && <ProfilePage data={data} onUpdate={handleUpdateProfile} onReset={handleReset} />}
      </AppLayout>
    </>
  )
}
