import React, { useState } from 'react'
import type { Page } from '../types'

interface NavItem {
  page: Page
  icon: string
  label: string
}

const navItems: NavItem[] = [
  { page: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { page: 'passport', icon: '🪪', label: 'My Passport' },
  { page: 'quiz', icon: '🧠', label: 'E-Waste Quiz' },
  { page: 'missions', icon: '♻️', label: 'Eco Missions' },
  { page: 'badges', icon: '🏆', label: 'Badges' },
  { page: 'leaderboard', icon: '📊', label: 'Leaderboard' },
  { page: 'rewards', icon: '🎁', label: 'Rewards' },
  { page: 'certificate', icon: '📜', label: 'Certificate' },
  { page: 'profile', icon: '⚙️', label: 'Profile' },
]

const bottomNavItems: NavItem[] = [
  { page: 'dashboard', icon: '🏠', label: 'Home' },
  { page: 'quiz', icon: '🧠', label: 'Quiz' },
  { page: 'missions', icon: '♻️', label: 'Missions' },
  { page: 'badges', icon: '🏆', label: 'Badges' },
  { page: 'passport', icon: '🪪', label: 'Passport' },
]

interface AppLayoutProps {
  page: Page
  onNavigate: (page: Page) => void
  children: React.ReactNode
}

export default function AppLayout({ page, onNavigate, children }: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-offwhite lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-forest/10 bg-white px-5 py-6 lg:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="text-2xl">♻️</span>
          <span className="font-display text-base font-bold tracking-tight text-forest-dark">E-WASTE PASSPORT</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`focus-ring flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                page === item.page
                  ? 'bg-forest text-white shadow-card'
                  : 'text-charcoal hover:bg-mint/30'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="rounded-2xl bg-mint/30 px-4 py-3 text-center text-[11px] font-medium text-forest-dark">
          Learn. Act. Earn. Recycle.
          <div className="mt-0.5 text-charcoal-light">Campaign 2026</div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-forest/10 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xl">♻️</span>
          <span className="font-display text-sm font-bold text-forest-dark">E-WASTE PASSPORT</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl bg-mint/40 text-forest-dark"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50 animate-fade-in" onClick={() => setDrawerOpen(false)} />
          <div className="animate-slide-up absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-card-lg">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-sm font-bold text-forest-dark">Menu</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-xl bg-mint/40"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page)
                    setDrawerOpen(false)
                  }}
                  className={`focus-ring flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium ${
                    page === item.page ? 'bg-forest text-white' : 'text-charcoal hover:bg-mint/30'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 lg:px-10 lg:pb-10 lg:pt-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-[70] flex border-t border-forest/10 bg-white px-1 py-1.5 lg:hidden">
        {bottomNavItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`focus-ring flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium ${
              page === item.page ? 'text-emerald-dark' : 'text-charcoal-light'
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
