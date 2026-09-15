<div align="center">

# 🏢 Enterprise TaskFlow — Web

**Corporate task management dashboard built to scale.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🔗 Overview & Integration

This repository is the **Front-end** of the **Enterprise TaskFlow** ecosystem — a Full Stack task management system designed for logistics and corporate environments.

The interface directly consumes the [**Enterprise TaskFlow API**](https://github.com/seu-usuario/enterprise-taskflow-api), a RESTful API built with **.NET 8** using **Clean Architecture**, **CQRS (MediatR)**, **Redis** (5-min cache TTL), **RabbitMQ** (async messaging), and **SQL Server**.

> Together, API + Web form a complete Full Stack ecosystem — from persistence and distributed caching to the end-user experience in the browser.

---

## 🏗️ Architectural Decisions

### Authentication & Security

| Aspect | Implementation |
|---|---|
| **Protocol** | JWT Bearer Token issued by the API |
| **Storage** | `localStorage` managed via Zustand |
| **Auto-injection** | Axios Interceptor injects `Authorization: Bearer <token>` on every request |
| **Expiration** | Response interceptor detects `401 Unauthorized`, clears state, and redirects to login |
| **Protected routes** | `PrivateRoute` wrapper validates the session before rendering authenticated routes |

### State Management

**Zustand** was chosen as the global state manager because it is:
- **Minimal** — no boilerplate from reducers, actions, or providers;
- **Type-safe** — native TypeScript integration without wrappers;
- **Performant** — granular subscriptions that prevent unnecessary re-renders.

Stores are split by domain:

```
stores/
├── useAuthStore.ts    → JWT token, user data, login/logout
└── useTaskStore.ts    → Pending tasks, loading states, actions
```

### Componentization

The structure follows a **Feature-based Organization** pattern, clearly separating responsibilities:

```
src/
├── components/        → Reusable UI components (Button, Card, Modal...)
├── hooks/             → Custom hooks encapsulating business logic
├── pages/             → Page-level components (Login, Dashboard)
├── routes/            → React Router config + PrivateRoute
├── services/api/      → Axios instance, interceptors, and endpoint modules
├── stores/            → Zustand stores by domain
├── types/             → Shared TypeScript interfaces and types
├── App.tsx            → Root component with route providers
├── main.tsx           → Application entry point
└── index.css          → Design System (Tailwind v4 @theme tokens)
```

### Design System

CSS is built on top of Tailwind CSS v4's **@theme token** system, ensuring visual consistency without arbitrary classes:

| Token | Usage |
|---|---|
| `brand-*` | Primary brand colors (blue scale) |
| `surface-*` | Neutral tones for backgrounds and text (slate scale) |
| `success-*` / `danger-*` / `warning-*` | Visual status feedback |
| `font-sans` | Inter (Google Fonts) — professional typography |

> The interface operates in **dark mode by default**, following the trend of modern corporate dashboards that prioritize visual comfort during extended operations.

---

## ⚡ Features

| Feature | Consumed Endpoint | Description |
|---|---|---|
| 🔐 **Login** | `POST /api/auth/login` | Authentication with username/password. Stores the JWT and redirects to the Dashboard. |
| 📋 **Task Listing** | `GET /api/tasks/pending` | Displays all pending tasks. The API serves data from Redis cache (5-min TTL) for high performance. |
| ✅ **Complete Task** | `POST /api/tasks/{id}/complete` | Marks the task as completed. The API invalidates the cache and publishes an event to RabbitMQ. The UI updates instantly. |

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **UI Library** | React | 19.x | Declarative interface building |
| **Language** | TypeScript | 6.0 | Static typing and compile-time safety |
| **Build Tool** | Vite | 8.x | Instant HMR and optimized builds |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS with custom design tokens |
| **Routing** | React Router DOM | 7.x | SPA routing with protected routes |
| **HTTP Client** | Axios | 1.x | HTTP requests with JWT interceptors |
| **Global State** | Zustand | 5.x | Minimal and performant state management |
| **Lint** | Oxlint | 1.x | Fast linting with React + TypeScript rules |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- [**Enterprise TaskFlow API**](https://github.com/seu-usuario/enterprise-taskflow-api) running on port `5000`

### Step by step

```bash
# 1. Clone the repository
git clone https://github.com/seu-usuario/enterprise-taskflow-web.git
cd enterprise-taskflow-web

# 2. Install dependencies
npm install

# 3. Set up the environment
cp .env.example .env
```

Edit the `.env` file with your local API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
# 4. Start the development server
npm run dev
```

The application will be available at **http://localhost:5173**.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server with HMR |
| `npm run build` | Generates the optimized production bundle |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs Oxlint for static analysis |

---

## 🔄 API Integration Flow

```
┌─────────────────────┐       HTTP/JWT        ┌──────────────────────────┐
│                     │ ────────────────────> │                          │
│   Enterprise        │                       │   Enterprise             │
│   TaskFlow Web      │ <──────────────────── │   TaskFlow API           │
│                     │         JSON          │                          │
│   React + TS        │                       │   .NET 8                 │
│   Vite + Tailwind   │                       │   Clean Architecture     │
│                     │                       │   Redis + RabbitMQ       │
└─────────────────────┘                       └──────────────────────────┘
        :5173                                         :5000
```

1. **Login** → The front-end sends credentials via `POST`. The API returns a JWT valid for 1 hour.
2. **Dashboard** → Axios injects the token automatically. The API returns tasks from Redis cache.
3. **Complete** → The front-end fires the `POST`. The API marks the task, invalidates the cache, and publishes to RabbitMQ.

---

## 📁 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | ✅ | Base URL for the Enterprise TaskFlow API (e.g., `http://localhost:5000/api`) |

---

## 📄 License

This project is for educational and demonstration purposes — developed as part of a professional Full Stack portfolio.

---

<div align="center">

**Built with ❤️ and best practices by [Gabriel CodWell](https://www.linkedin.com/in/gabriel-codwell-7b060a433/)**

*Enterprise TaskFlow — From clean architecture to the perfect pixel.*

</div>
