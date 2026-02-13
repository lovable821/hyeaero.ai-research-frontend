# HyeAero.AI — Aircraft Research & Valuation Consultant (Frontend)

Interactive **Research Dashboard** for [HyeAero.com/research](https://www.hye.aero/): Ask the Consultant (AI chat), Market Comparison, Price Estimator, Resale Advisory. Built with Next.js and Tailwind.

## Features

- **Ask Consultant** — RAG-powered chat over Hye Aero’s sale history and market data (authenticated users). Export chat to PDF.
- **Market Comparison** — Compare aircraft by model, region, hours; side-by-side table from backend.
- **Price Estimator** — Predictive valuation and time-to-sale from backend (historical sales).
- **Resale Advisory** — Plain-English resale guidance from backend (RAG).
- Tab-based navigation; Sign in / Sign out (demo state; wire to real auth later).

## Setup

```bash
cd frontend
npm install
```

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Backend connection

1. Start the backend API (see `backend/README.md`):
   ```bash
   cd backend && python runners/run_api.py
   ```

2. In frontend `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

Chat is proxied via Next.js (`/api/chat` → backend `/api/rag/answer`). Market Comparison, Price Estimator, and Resale Advisory call `NEXT_PUBLIC_API_URL` from the browser.

To show a demo reply when the backend is down, set:
```env
NEXT_PUBLIC_DEMO_CHAT=true
```

## Build

```bash
npm run build
npm start
```
