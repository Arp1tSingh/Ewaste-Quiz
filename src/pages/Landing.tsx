import React from 'react'
import Button from '../components/Button'
import Card from '../components/Card'

interface LandingProps {
  onStart: () => void
}

const howItWorks = [
  { step: '01', icon: '🧠', title: 'Learn', text: 'Take the E-Waste Awareness Quiz.' },
  { step: '02', icon: '⚡', title: 'Act', text: 'Complete simple eco-friendly missions.' },
  { step: '03', icon: '🌱', title: 'Earn', text: 'Collect Eco Points and unlock badges.' },
  { step: '04', icon: '🌍', title: 'Impact', text: 'Help create a cleaner, greener campus.' },
]

const whyItMatters = [
  {
    icon: '📱',
    title: 'Electronic Waste',
    text: 'Old phones, laptops, chargers and other electronic devices can become e-waste.',
  },
  {
    icon: '♻️',
    title: 'Recoverable Materials',
    text: 'Responsible recycling can help recover useful materials.',
  },
  {
    icon: '🔋',
    title: 'Batteries Matter',
    text: 'Batteries need responsible handling and disposal.',
  },
  {
    icon: '🌍',
    title: 'Make the Right Choice',
    text: 'Reuse, repair and responsible recycling are better choices than throwing electronics into ordinary waste.',
  },
]

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-offwhite">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          <span className="font-display text-base font-bold tracking-tight text-forest-dark">E-WASTE PASSPORT</span>
        </div>
        <Button size="sm" onClick={onStart}>
          Create Passport
        </Button>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:pt-12">
        <div className="animate-slide-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-mint/50 px-4 py-1.5 text-xs font-semibold text-forest-dark">
            ♻️ College E-Waste Awareness Campaign 2026
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-forest-dark sm:text-5xl">
            Your Electronics Have a Second Life. Give Them One.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal-light">
            Learn about e-waste, complete eco missions, earn points and become a Green Champion on your campus.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={onStart}>
              Get Started
            </Button>
            <Button size="lg" variant="secondary" onClick={() => document.getElementById('why-matters')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Campaign
            </Button>
          </div>
        </div>

        {/* Passport illustration */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -top-6 left-4 text-3xl opacity-30 sm:left-10">🔋</div>
          <div className="absolute -right-2 top-16 text-3xl opacity-30 sm:right-6">🔌</div>
          <div className="absolute bottom-4 left-0 text-3xl opacity-30">💻</div>
          <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-forest to-forest-dark p-6 text-white shadow-card-lg">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-mint">
              <span>E-WASTE PASSPORT</span>
              <span>CAMPAIGN 2026</span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">🎓</div>
              <div>
                <div className="font-display text-lg font-bold">Aditi Rao</div>
                <div className="text-xs text-mint/80">Passport ID · EWP-4K9XQ2</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <div className="text-[11px] text-mint/80">Eco Level</div>
                <div className="font-display text-sm font-semibold">♻️ Green Warrior</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <div className="text-[11px] text-mint/80">Eco Points</div>
                <div className="font-display text-sm font-semibold">95 XP</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 text-xl">
              <span>🌱</span>
              <span>📚</span>
              <span>♻️</span>
              <span className="opacity-30">🏆</span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
              <div className="text-[11px] text-mint/70">Scan at campus collection points</div>
              <div className="grid h-12 w-12 grid-cols-4 grid-rows-4 gap-[2px] rounded-md bg-white/90 p-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`${[0, 3, 5, 6, 9, 10, 12, 15].includes(i) ? 'bg-forest-dark' : 'bg-transparent'} rounded-[1px]`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">How it works</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item) => (
            <Card key={item.step} hover>
              <div className="text-xs font-semibold text-emerald-dark">{item.step}</div>
              <div className="mt-3 text-2xl">{item.icon}</div>
              <div className="mt-2 font-display text-base font-semibold text-forest-dark">{item.title}</div>
              <p className="mt-1 text-sm text-charcoal-light">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section id="why-matters" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">Why e-waste matters</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyItMatters.map((item) => (
            <Card key={item.title} hover>
              <div className="text-2xl">{item.icon}</div>
              <div className="mt-2 font-display text-base font-semibold text-forest-dark">{item.title}</div>
              <p className="mt-1 text-sm text-charcoal-light">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-forest to-forest-dark px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to start your eco journey?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-mint/80">
            Create your digital E-Waste Profile in under a minute and start earning points today.
          </p>
          <div className="mt-6">
            <Button size="lg" variant="amber" onClick={onStart}>
              Create Passport
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-forest/10 px-5 py-6 text-center text-xs text-charcoal-light sm:px-8">
        ♻️ E-Waste Passport · Learn. Act. Earn. Recycle. · College E-Waste Awareness Campaign 2026
      </footer>
    </div>
  )
}
