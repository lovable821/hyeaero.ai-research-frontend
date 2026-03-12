# HyeAero.AI — Aircraft Research & Valuation Consultant (Frontend)

Interactive **Research Dashboard** for [HyeAero.com/research](https://www.hye.aero/): Ask the Consultant (AI chat), Market Comparison, Price Estimator, Resale Advisory. Built with Next.js and Tailwind.

## Features

- **Ask Consultant** — RAG-powered chat over Hye Aero’s sale history and market data (authenticated users). Export chat to PDF.
- **Market Comparison** — Compare aircraft by model, region, hours; side-by-side table from backend.
- **Price Estimator** — Predictive valuation and time-to-sale from backend (historical sales).
- **Resale Advisory** — Plain-English resale guidance from backend (RAG).
- Tab-based navigation; Sign in / Sign out (demo state; wire to real auth later).

## Setup (local)

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
# Optional: show a canned demo reply if backend is offline
NEXT_PUBLIC_DEMO_CHAT=false
```

## Run (development)

1. Start the backend API (see `backend/README.md`):
   ```bash
   cd backend
   python runners/run_api.py
   ```

2. In a second terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Backend connection

- Chat is proxied via Next.js (`/api/chat` → backend `/api/rag/answer`).
- Market Comparison, Price Estimator, Resale Advisory, and Owner Details call the backend directly using `NEXT_PUBLIC_API_URL`.
- The **Owner details** panel shows combined data from listings, FAA registry, and ZoomInfo (when enabled on the backend).

To show a demo reply when the backend is down, set:

```env
NEXT_PUBLIC_DEMO_CHAT=true
```

## Production build & deploy

```bash
cd frontend
npm run build
npm start    # serves the built app on port 3000 by default
```

For production, set:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.example.com
```

and ensure the backend CORS settings allow that origin.
