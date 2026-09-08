import React from 'react'

interface StatCardProps {
  label: string
  value: React.ReactNode
  icon: string
  accent?: string
}

export default function StatCard({ label, value, icon, accent = 'bg-mint/40' }: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${accent}`}>
        {icon}
      </div>
      <div className="text-2xl font-display font-bold text-forest-dark animate-[count-up_0.5s_ease-out]">{value}</div>
      <div className="mt-0.5 text-xs font-medium text-charcoal-light">{label}</div>
    </div>
  )
}
