import React, { useState } from 'react'
import type { Profile } from '../types'
import Button from '../components/Button'
import Card from '../components/Card'

interface ProfileSetupProps {
  onCreate: (profile: Profile) => void
  onDemo: () => void
}

const departments = ['Computer Engineering', 'Information Technology', 'Electronics', 'Mechanical', 'Other']
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function ProfileSetup({ onCreate, onDemo }: ProfileSetupProps) {
  const [fullName, setFullName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [department, setDepartment] = useState(departments[0])
  const [year, setYear] = useState(years[0])
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName.trim() || !studentId.trim()) {
      setError('Please fill in your full name and student ID.')
      return
    }
    onCreate({ fullName: fullName.trim(), studentId: studentId.trim(), department, year })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 py-10">
      <div className="w-full max-w-md animate-slide-up">
        <div className="mb-6 text-center">
          <span className="text-3xl">♻️</span>
          <h1 className="mt-3 font-display text-2xl font-bold text-forest-dark">Create Your Passport</h1>
          <p className="mt-1 text-sm text-charcoal-light">Set up your identity for the E-Waste Awareness Campaign.</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-charcoal">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aditi Rao"
                className="focus-ring w-full rounded-xl border border-forest/15 bg-offwhite px-4 py-3 text-sm outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-charcoal">Student ID</label>
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. CE2026041"
                className="focus-ring w-full rounded-xl border border-forest/15 bg-offwhite px-4 py-3 text-sm outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-charcoal">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="focus-ring w-full rounded-xl border border-forest/15 bg-offwhite px-4 py-3 text-sm outline-none"
              >
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-charcoal">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="focus-ring w-full rounded-xl border border-forest/15 bg-offwhite px-4 py-3 text-sm outline-none"
              >
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            <Button type="submit" size="lg" fullWidth>
              Create My Passport
            </Button>
          </form>
        </Card>
        <button
          onClick={onDemo}
          className="focus-ring mx-auto mt-4 block rounded-xl px-4 py-2 text-sm font-semibold text-emerald-dark hover:text-emerald-dark/80"
        >
          🎬 Try Demo Instead
        </button>
      </div>
    </div>
  )
}
