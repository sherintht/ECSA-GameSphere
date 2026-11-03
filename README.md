# ECSA Strategy Arena — v1.0

A responsive React + Vite starter application for an individual ECE student gaming competition. Includes seven playable mini-challenges, a timer, answer review, score submission, and leaderboard.

## Important: demo mode vs public mode

- **Demo mode:** If Supabase environment variables are empty, the app stores scores in the current browser's local storage. This is only for local testing on one browser/device.
- **Public mode:** Configure Supabase using the steps below. Scores are submitted to a shared PostgreSQL table and the leaderboard is shared across devices.

This is a starter competition platform, not a secure examination system. In v1 the browser calculates scores and public anonymous score submission is enabled by the SQL policy. A technically knowledgeable participant could manipulate requests or submit duplicate/fake scores. For a prize-bearing official event, implement Supabase Auth/verified registration and server-side answer validation before relying on rankings.

## 1. Requirements

Install:
- Node.js 20 LTS or newer
- Git
- A GitHub account
- A Supabase account (free tier)
- A Vercel account (free tier)

## 2. Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

On Windows PowerShell, copy the environment template with:
```powershell
Copy-Item .env.example .env
```

You can test immediately in demo mode without Supabase. Local demo scores do not sync to another device.

## 3. Set up Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor** in the Supabase dashboard.
3. Copy all contents of `supabase/schema.sql` and run it.
4. Open **Project Settings → API**.
5. Copy the Project URL and the `anon` / publishable key (never use the `service_role` key in a browser app).
6. Put them in `.env`:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

7. Stop and restart `npm run dev`.
8. Submit a test score, then check **Table Editor → scores**.

The public leaderboard reads the `scores` table. The SQL policies allow anonymous score inserts and public reads. This is acceptable only for a prototype/demo; it is not fraud-resistant.

## 4. Push to GitHub

Create a new empty repository named `ecsa-strategy-arena` on GitHub. Then run these commands from this project folder:

```bash
git init
git add .
git commit -m "Initial ECSA Strategy Arena v1"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ecsa-strategy-arena.git
git push -u origin main
```

Do not commit `.env`. It is excluded by `.gitignore`. Commit `.env.example` only.

## 5. Deploy on Vercel

1. Visit https://vercel.com and sign in using GitHub.
2. Select **Add New → Project**.
3. Import `ecsa-strategy-arena`.
4. Framework preset: **Vite** (usually detected automatically).
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
8. Click **Deploy**.
9. Open the deployed URL on a phone and laptop and test a score from each device.

Every push to the connected GitHub main branch will trigger a new Vercel deployment.

## 6. Competition day checklist

- Test registration on at least two different phones.
- Verify Supabase receives the scores.
- Check that the leaderboard is shared across devices.
- Confirm all seven games and answer explanations.
- Test Wi-Fi/mobile data at the venue.
- Display the QR code for the deployed URL.
- Announce rules: individual play, no duplicate accounts, one attempt per game (if this is the event rule), and the scoring/tie-break procedure.
- Export/backup the `scores` table after the event.

## 7. Current scoring

For each game:
- 100 points per correct answer.
- 100-point perfect-completion bonus.
- Speed bonus: `max(0, floor((300 - elapsed seconds) / 3))`.

The current leaderboard lists each game attempt as a separate row. For the final overall champion, aggregate each student's scores across all seven games (and define a policy for incomplete games) before awarding the prize. Do not simply award the highest single-game score.

## 8. Before using this for a real prize competition

Recommended v1.1 hardening:
1. Student sign-in with verified college email or pre-approved register numbers.
2. Unique constraint for one attempt per student per game.
3. Server-side scoring through a Supabase Edge Function; do not accept client-provided score values.
4. Admin authentication and role-based controls.
5. Competition start/end windows enforced server-side.
6. Audit log and a clear tie-break rule.
7. Privacy notice and limited retention of student details.

## Project structure

```text
ecsa-strategy-arena/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── games.js
│   ├── supabase.js
│   └── style.css
└── supabase/
    └── schema.sql
```
