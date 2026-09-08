export interface Profile {
  fullName: string
  studentId: string
  department: string
  year: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface QuizResult {
  completed: boolean
  score: number
  total: number
  answers: number[]
  pointsAwarded: boolean
  completedAt: string | null
}

export interface Mission {
  id: string
  icon: string
  title: string
  description: string
  points: number
}

export interface Badge {
  id: string
  icon: string
  name: string
  description: string
  requirement: string
  check: (data: UserData) => boolean
}

export interface UnlockedBadge {
  id: string
  unlockedAt: string
}

export interface Reward {
  id: string
  icon: string
  name: string
  description: string
  cost: number
}

export interface Redemption {
  id: string
  rewardId: string
  code: string
  redeemedAt: string
}

export interface DemoStudent {
  rank: number
  name: string
  department: string
  points: number
  level: string
  badgeCount: number
}

export interface UserData {
  profile: Profile | null
  passportId: string
  points: number
  quiz: QuizResult
  missionsCompleted: string[]
  badgesUnlocked: UnlockedBadge[]
  rewardsRedeemed: Redemption[]
  createdAt: string
  isDemo: boolean
}

export type Page =
  | 'landing'
  | 'setup'
  | 'dashboard'
  | 'quiz'
  | 'missions'
  | 'badges'
  | 'leaderboard'
  | 'rewards'
  | 'passport'
  | 'certificate'
  | 'profile'

export interface LevelInfo {
  name: string
  icon: string
  min: number
  max: number | null
}

export interface ToastMessage {
  id: number
  message: string
  variant: 'success' | 'info' | 'error'
}
