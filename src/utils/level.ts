import type { LevelInfo } from '../types'

export const levels: LevelInfo[] = [
  { name: 'Eco Starter', icon: '🌱', min: 0, max: 24 },
  { name: 'Eco Learner', icon: '🌿', min: 25, max: 74 },
  { name: 'Green Warrior', icon: '♻️', min: 75, max: 149 },
  { name: 'Eco Champion', icon: '🌍', min: 150, max: 249 },
  { name: 'E-Waste Legend', icon: '🏆', min: 250, max: null },
]

export function getLevel(points: number): LevelInfo {
  return levels.find((l) => points >= l.min && (l.max === null || points <= l.max)) ?? levels[0]
}

export function getNextLevel(points: number): LevelInfo | null {
  const idx = levels.findIndex((l) => points >= l.min && (l.max === null || points <= l.max))
  if (idx === -1 || idx === levels.length - 1) return null
  return levels[idx + 1]
}

export function getLevelProgress(points: number): { current: number; target: number; percent: number } {
  const level = getLevel(points)
  const next = getNextLevel(points)
  if (!next) {
    return { current: points, target: points, percent: 100 }
  }
  const span = next.min - level.min
  const progressWithinLevel = points - level.min
  const percent = Math.min(100, Math.round((progressWithinLevel / span) * 100))
  return { current: points, target: next.min, percent }
}
