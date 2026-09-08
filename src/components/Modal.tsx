import React from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  size?: 'sm' | 'md'
}

export default function Modal({ open, onClose, children, size = 'sm' }: ModalProps) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`animate-pop w-full ${size === 'sm' ? 'max-w-sm' : 'max-w-lg'} rounded-3xl bg-white p-7 shadow-card-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
