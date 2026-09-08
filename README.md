# E-Waste Passport 🌱

A frontend-only gamified web app for a **College E-Waste Awareness Campaign 2026**.
Built with **React + TypeScript + Vite + Tailwind CSS**. All data is stored in the
browser via `localStorage` — there is no backend, database, or API.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## What you can do

1. Create a digital passport (or tap **Try Demo** for pre-filled sample data).
2. Take the 10-question E-Waste Awareness Quiz and earn +20 Eco Points.
3. Complete Eco Missions for more points.
4. Unlock badges automatically as you hit milestones.
5. Check your spot on the Campus Eco Leaderboard.
6. Redeem Eco Points for rewards and get a unique reward code.
7. View your digital E-Waste Passport and Eco Journey.
8. Print a Certificate of Eco Participation.
9. Edit your profile or reset your passport entirely.

Refreshing the browser never loses your progress — it's all persisted to
`localStorage` under the key `ewastePassportData`.

## Project structure

```
src/
  components/   Reusable UI (Button, Card, ProgressBar, Modal, Toast, BadgeCard, RewardCard, etc.)
  pages/        One file per screen (Dashboard, Quiz, Missions, Badges, Leaderboard, Rewards, Passport, Certificate, Profile)
  layouts/      AppLayout — sidebar (desktop) + drawer/bottom nav (mobile)
  data/         Static content: quiz questions, missions, badges, rewards, demo leaderboard
  utils/        storage.ts (all localStorage read/write logic) and level.ts (level thresholds)
  types/        Shared TypeScript interfaces
```

All localStorage access is centralized in `src/utils/storage.ts` via functions like
`getUserData()`, `saveUserData()`, `addPoints()`, `completeMission()`, `saveQuizResult()`,
from components.

## Deploying to Vercel

The app is ready for Vercel deployment. A `vercel.json` is included to handle client-side routing.
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` from the root directory to deploy.
3. Or, link this GitHub repository directly in the Vercel dashboard.
