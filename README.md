# Lively

Concert discovery web app with a vanilla JavaScript frontend and an Express backend.

## Tech Stack

- Frontend: Vanilla JS + Vite + CSS
- Backend: Node.js + Express
- Database tooling: PostgreSQL (`pg`) reset/seed script
- Runtime API data source: `server/data/concerts.js`

## Prerequisites

- Node.js 18+ (Node 22 recommended)
- npm

## Install

```bash
cd server
npm install

cd ../client
npm install
```

## Run (Development)

1. Start the API:

```bash
cd server
npm start
```

`npm start` runs:

- `npm run reset` (recreates and seeds the `concerts` table)
- `nodemon --require dotenv/config server.js`

2. Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

## Environment Variables (Server)

Create `server/.env` with:

```env
PGUSER=your_user
PGPASSWORD=your_password
PGHOST=your_host
PGPORT=5432
PGDATABASE=your_database
```

## API Endpoints

- `GET /api/concerts`
  - Returns all concerts from `server/data/concerts.js`
- `GET /api/concerts/:slug`
  - Returns one concert by slug
  - Returns `404` JSON if not found

## Database Reset Script

Run manually:

```bash
cd server
npm run reset
```

This executes `server/config/reset.js`, which:

- Drops `concerts` table if it exists
- Recreates `concerts`
- Seeds rows from `server/data/concerts.js`

## Notes

- The frontend dev server proxies `/api` to `http://localhost:3000` (see `client/vite.config.js`).
- `client` build output is configured to `server/public`.
- `server/routes/concerts.js` references `server/public/concert.html`; add that file if you plan to serve a detail page from that route.
