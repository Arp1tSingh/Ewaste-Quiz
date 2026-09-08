import React from 'react'
import Button from './Button'

interface EmptyStateProps {
  icon: string
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-mint bg-white/60 px-6 py-14 text-center">
      <div className="mb-3 text-4xl">{icon}</div>
      <div className="mb-1 font-display text-lg font-semibold text-forest-dark">{title}</div>
      <p className="mb-5 max-w-xs text-sm text-charcoal-light">{message}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
