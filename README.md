# Task Management Application — Run Guide

Full-stack task manager with a **Next.js** frontend (`client/`) and an **Express + Prisma** API (`server/`). PostgreSQL is hosted on [Neon](https://neon.tech) and is **not** run in Docker.

| Service  | Port | Tech                        |
| -------- | ---- | --------------------------- |
| Frontend | 3000 | Next.js 16, React 19        |
| Backend  | 3002 | Express, Prisma, TypeScript |
| Database | —    | Neon PostgreSQL (external)  |

---

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Docker setup)
- A Neon PostgreSQL database with connection string

---

## Environment variables

### Backend (`server/.env`)

Copy the example and fill in your Neon URL:

```bash
cp server/.env.example server/.env
```

| Variable       | Description                       | Example                          |
| -------------- | --------------------------------- | -------------------------------- |
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `PORT`         | API port (default `3002`)         | `3002`                           |

### Frontend (`client/.env`)

```bash
cp client/.env.example client/.env
```

| Variable              | Description          | Local dev value             |
| --------------------- | -------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3002/api` |

> **Docker note:** The frontend container uses `http://backend:3002/api` internally (set automatically in `docker-compose.yml`). API calls run via Next.js server actions, so the browser never talks to the backend directly.

---

## Local development

### Run frontend and backend separately with hot reload.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # if not done yet — edit DATABASE_URL
npx prisma generate
npx prisma migrate deploy
npm run dev
```

API available at [http://localhost:3002](http://localhost:3002).

### 2. Frontend

In a second terminal:

```bash
cd client
npm install
cp .env.example .env   # if not done yet
npm run dev
```

App available at [http://localhost:3000](http://localhost:3000).

---

## Database migrations

Migrations live in `server/prisma/migrations/`.

```bash
cd server

# Apply pending migrations (Neon)
npx prisma migrate deploy

# Create a new migration (development)
npx prisma migrate dev --name your_migration_name

# Open Prisma Studio
npx prisma studio
```

---

## API endpoints

Base path: `/api`

| Method | Path                    | Description      |
| ------ | ----------------------- | ---------------- |
| GET    | `/api/v1`               | Health / welcome |
| GET    | `/api/tasks`            | List tasks       |
| POST   | `/api/tasks`            | Create task      |
| GET    | `/api/tasks/:id`        | Get task         |
| PUT    | `/api/tasks/:id`        | Update task      |
| PATCH  | `/api/tasks/:id/toggle` | Toggle complete  |
| DELETE | `/api/tasks/:id`        | Delete task      |

Query params for `GET /api/tasks`: `search`, `status`, `page`, `limit`.

---

## Project structure

```
task-management-application/
├── client/                 # Next.js frontend (port 3000)
│   ├── src/app/            # App Router pages
│   ├── src/actions/        # Server actions (API calls)
│   └── Dockerfile
├── server/                 # Express API (port 3002)
│   ├── src/
│   ├── prisma/             # Schema & migrations
│   └── Dockerfile
├── docker-compose.yml      # Frontend + backend
└── RUN.md                  # This file
```

---

## Troubleshooting

### Backend fails on startup — database connection

- Confirm `DATABASE_URL` in `server/.env` is correct and Neon is reachable.
- Neon URLs must include `?sslmode=require`.
- Run migrations manually: `cd server && npx prisma migrate deploy`.

### Frontend shows errors fetching tasks

- Ensure the backend is running on port 3002.
- Local dev: `NEXT_PUBLIC_API_URL=http://localhost:3002/api` in `client/.env`.
- Docker: frontend depends on backend healthcheck — wait for backend to be healthy.

### Port already in use

Change host ports in `docker-compose.yml`:

```yaml
ports:
  - "3000:3000" # frontend
  - "3002:3002" # backend
```
