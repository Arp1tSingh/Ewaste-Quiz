import React from 'react'

interface ProgressBarProps {
  percent: number
  label?: string
  colorClass?: string
  trackClass?: string
  height?: string
}

export default function ProgressBar({
  percent,
  label,
  colorClass = 'bg-emerald',
  trackClass = 'bg-mint/40',
  height = 'h-3',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div>
      {label && <div className="mb-1.5 text-xs font-medium text-charcoal-light">{label}</div>}
      <div className={`w-full overflow-hidden rounded-full ${trackClass} ${height}`}>
        <div
          className={`${height} rounded-full ${colorClass} transition-[width] duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
