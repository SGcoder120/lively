# Lively

Concert discovery web app with an Express API and a vanilla JavaScript frontend.

## Features

- Browse a concert list
- Open a concert detail page
- Filter by:
  - Genre
  - Ticket price range
  - Venue size

## Tech Stack

- Frontend: Vanilla JS + Vite
- Styling: PicoCSS (+ custom CSS)
- Backend: Node.js + Express
- Data: Local in-memory dataset (`server/data/concerts.js`)

## Project Structure

```text
lively/
  client/
    index.html
    404.html
    public/concertIcon.jpg
    src/main.js
    src/style.css
    vite.config.js
  server/
    index.js
    data/concerts.js
```

## Prerequisites

- Node.js 18+ recommended
- npm

## Setup

Install dependencies in both apps:

```bash
cd server
npm install

cd ../client
npm install
```

## Run (Development)

Start the API server:

```bash
cd server
npm start
```

In a second terminal, start the frontend dev server:

```bash
cd client
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

Notes:

- API runs on `http://localhost:3000`
- Vite proxies `/api` requests to port `3000` via `client/vite.config.js`

## API Endpoints

- `GET /api/concerts`
  - Returns all concerts
- `GET /api/concerts/:slug`
  - Returns one concert by slug
  - Returns `404` JSON if not found

## Data Model

Each concert entry includes:

- `id`
- `slug`
- `eventName`
- `artists` (array)
- `dateTime` (display string)
- `venue`
- `venueSize` (`Small` | `Medium` | `Large`)
- `city`
- `genre`
- `ticketPrice` (number or `null` for free)

## Scripts

### Client (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build frontend assets
- `npm run preview` - Preview built assets

### Server (`server/package.json`)

- `npm start` - Run Express server with Nodemon
