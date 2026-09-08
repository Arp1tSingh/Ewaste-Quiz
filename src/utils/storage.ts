import type { UserData, Profile, Redemption } from '../types'
import { badges } from '../data/badgesData'

const STORAGE_KEY = 'ewastePassportData'

function generatePassportId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `EWP-${code}`
}

function generateRewardCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `ECO-${code}`
}

export function emptyUserData(): UserData {
  return {
    profile: null,
    passportId: generatePassportId(),
    points: 0,
    quiz: { completed: false, score: 0, total: 10, answers: [], pointsAwarded: false, completedAt: null },
    missionsCompleted: [],
    badgesUnlocked: [],
    rewardsRedeemed: [],
    createdAt: new Date().toISOString(),
    isDemo: false,
  }
}

export function getUserData(): UserData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as UserData
    return parsed
  } catch {
    return null
  }
}

export function saveUserData(data: UserData): UserData {
  const evaluated = evaluateBadges(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluated))
  return evaluated
}

export function clearUserData(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function createProfile(profile: Profile): UserData {
  const data = emptyUserData()
  data.profile = profile
  return saveUserData(data)
}

export function updateProfile(profile: Profile): UserData {
  const data = getUserData() ?? emptyUserData()
  data.profile = profile
  return saveUserData(data)
}

export function addPoints(amount: number): UserData {
  const data = getUserData() ?? emptyUserData()
  data.points += amount
  return saveUserData(data)
}

export function completeMission(missionId: string, points: number): { data: UserData; awarded: boolean } {
  const data = getUserData() ?? emptyUserData()
  if (data.missionsCompleted.includes(missionId)) {
    return { data, awarded: false }
  }
  data.missionsCompleted.push(missionId)
  data.points += points
  return { data: saveUserData(data), awarded: true }
}

export function saveQuizResult(score: number, total: number, answers: number[]): { data: UserData; awarded: boolean } {
  const data = getUserData() ?? emptyUserData()
  const wasAwarded = data.quiz.pointsAwarded
  data.quiz = {
    completed: true,
    score,
    total,
    answers,
    pointsAwarded: true,
    completedAt: new Date().toISOString(),
  }
  if (!wasAwarded) {
    data.points += 20
  }
  return { data: saveUserData(data), awarded: !wasAwarded }
}

export function redeemReward(rewardId: string, cost: number): { data: UserData; redemption: Redemption | null } {
  const data = getUserData() ?? emptyUserData()
  if (data.points < cost) return { data, redemption: null }
  const redemption: Redemption = {
    id: `${rewardId}-${Date.now()}`,
    rewardId,
    code: generateRewardCode(),
    redeemedAt: new Date().toISOString(),
  }
  data.points -= cost
  data.rewardsRedeemed.push(redemption)
  return { data: saveUserData(data), redemption }
}

export function evaluateBadges(data: UserData): UserData {
  const next = { ...data, badgesUnlocked: [...data.badgesUnlocked] }
  const unlockedIds = new Set(next.badgesUnlocked.map((b) => b.id))
  for (const badge of badges) {
    if (!unlockedIds.has(badge.id) && badge.check(next)) {
      next.badgesUnlocked.push({ id: badge.id, unlockedAt: new Date().toISOString() })
    }
  }
  return next
}

export function loadDemoData(profile: Profile): UserData {
  const data = emptyUserData()
  data.profile = profile
  data.isDemo = true
  data.points = 95
  data.missionsCompleted = ['learn-facts', 'identify-electronics', 'battery-safety']
  data.quiz = {
    completed: true,
    score: 8,
    total: 10,
    answers: [0, 1, 2, 1, 1, 1, 1, 0, 0, 1],
    pointsAwarded: true,
    completedAt: new Date().toISOString(),
  }
  return saveUserData(data)
}
