import React from 'react'
import type { UserData } from '../types'
import { getLevel } from '../utils/level'
import Button from '../components/Button'

interface CertificateProps {
  data: UserData
}

export default function Certificate({ data }: CertificateProps) {
  const level = getLevel(data.points)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">📜 Certificate</h1>
        <Button size="sm" onClick={() => window.print()}>
          Print Certificate
        </Button>
      </div>

      <div
        id="certificate-print"
        className="mx-auto mt-6 max-w-2xl rounded-2xl border-4 border-double border-forest/30 bg-white p-8 text-center shadow-card-lg sm:p-12"
      >
        <div className="flex items-center justify-center gap-2 text-forest-dark">
          <span className="text-2xl">♻️</span>
          <span className="font-display text-sm font-bold tracking-wide">E-WASTE QUIZ</span>
        </div>
        <div className="mt-6 font-display text-xl font-bold tracking-wide text-forest-dark sm:text-2xl">
          CERTIFICATE OF ECO PARTICIPATION
        </div>
        <p className="mt-6 text-sm text-charcoal-light">This certificate is proudly presented to</p>
        <div className="mt-3 font-display text-3xl font-bold text-emerald-dark sm:text-4xl">
          {data.profile?.fullName ?? 'Campaign Participant'}
        </div>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-charcoal-light">
          For actively participating in the E-Waste Awareness Campaign and contributing toward a cleaner and more
          sustainable campus.
        </p>

        <div className="mx-auto mt-8 grid max-w-sm grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-display text-lg font-bold text-forest-dark">{data.points}</div>
            <div className="text-[11px] text-charcoal-light">Eco Points</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-forest-dark">
              {level.icon} {level.name}
            </div>
            <div className="text-[11px] text-charcoal-light">Eco Level</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-forest-dark">2026</div>
            <div className="text-[11px] text-charcoal-light">Campaign Year</div>
          </div>
        </div>

        <div className="mt-10 flex justify-between px-4 text-xs text-charcoal-light sm:px-10">
          <div className="text-center">
            <div className="mb-1 h-10 border-b border-charcoal/30" />
            Campaign Coordinator
          </div>
          <div className="text-center">
            <div className="mb-1 h-10 border-b border-charcoal/30" />
            Faculty Coordinator
          </div>
        </div>
      </div>
    </div>
  )
}
