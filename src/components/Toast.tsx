import React from 'react'
import type { ToastMessage } from '../types'

interface ToastContainerProps {
  toasts: ToastMessage[]
}

const variantStyles: Record<ToastMessage['variant'], string> = {
  success: 'bg-forest text-white',
  info: 'bg-charcoal text-white',
  error: 'bg-red-600 text-white',
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed left-1/2 top-4 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-toast-in pointer-events-auto rounded-2xl px-5 py-3 text-center text-sm font-medium shadow-card-lg ${variantStyles[toast.variant]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
