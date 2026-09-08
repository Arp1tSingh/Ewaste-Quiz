import React, { useState } from 'react'
import type { Profile, UserData } from '../types'
import { getLevel } from '../utils/level'
import { badges } from '../data/badgesData'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'

interface ProfileProps {
  data: UserData
  onUpdate: (profile: Profile) => void
  onReset: () => void
}

const departments = ['Computer Engineering', 'Information Technology', 'Electronics', 'Mechanical', 'Other']
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function ProfilePage({ data, onUpdate, onReset }: ProfileProps) {
  const [editing, setEditing] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [fullName, setFullName] = useState(data.profile?.fullName ?? '')
  const [studentId, setStudentId] = useState(data.profile?.studentId ?? '')
  const [department, setDepartment] = useState(data.profile?.department ?? departments[0])
  const [year, setYear] = useState(data.profile?.year ?? years[0])

  const level = getLevel(data.points)

  function handleSave() {
    if (!fullName.trim() || !studentId.trim()) return
    onUpdate({ fullName: fullName.trim(), studentId: studentId.trim(), department, year })
    setEditing(false)
  }

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-forest-dark sm:text-3xl">⚙️ Profile</h1>
      <p className="mt-1 text-sm text-charcoal-light">Manage your passport details.</p>

      <Card className="mt-6 max-w-lg">
        {!editing ? (
          <div className="flex flex-col gap-3">
            <Row label="Full Name" value={data.profile?.fullName ?? '—'} />
            <Row label="Student ID" value={data.profile?.studentId ?? '—'} />
            <Row label="Department" value={data.profile?.department ?? '—'} />
            <Row label="Year" value={data.profile?.year ?? '—'} />
            <Row label="Eco Points" value={String(data.points)} />
            <Row label="Level" value={`${level.icon} ${level.name}`} />
            <Row label="Quiz Score" value={data.quiz.completed ? `${data.quiz.score}/${data.quiz.total}` : 'Not taken'} />
            <Row label="Badges" value={`${data.badgesUnlocked.length} / ${badges.length}`} />
            <Button className="mt-2 self-start" size="sm" onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Field label="Full Name" value={fullName} onChange={setFullName} />
            <Field label="Student ID" value={studentId} onChange={setStudentId} />
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
            <div className="flex gap-3">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="mt-6 max-w-lg border-2 border-red-100">
        <div className="font-display text-sm font-semibold text-red-600">Danger Zone</div>
        <p className="mt-1 text-sm text-charcoal-light">
          Resetting will clear all your campaign progress and return you to profile setup.
        </p>
        <Button variant="danger" size="sm" className="mt-3" onClick={() => setConfirmReset(true)}>
          Reset My Passport
        </Button>
      </Card>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)}>
        <div className="text-center">
          <div className="text-3xl">⚠️</div>
          <h2 className="mt-3 font-display text-lg font-bold text-forest-dark">Reset your passport?</h2>
          <p className="mt-2 text-sm text-charcoal-light">
            This will permanently erase your points, badges, quiz results, and missions. This cannot be undone.
          </p>
          <div className="mt-5 flex gap-3">
            <Button fullWidth variant="secondary" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button fullWidth variant="danger" onClick={onReset}>
              Yes, Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-forest/5 pb-2 text-sm">
      <span className="text-charcoal-light">{label}</span>
      <span className="font-semibold text-charcoal">{value}</span>
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-charcoal">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring w-full rounded-xl border border-forest/15 bg-offwhite px-4 py-3 text-sm outline-none"
      />
    </div>
  )
}
