# Habit Tracker PWA

A high-fidelity, production-ready Habit Tracker application built as a Progressive Web App (PWA). This project focuses on deterministic local state management, rigorous testing compliance, and a premium mobile-first user experience.

---

## 🔗 Live Demo

[View Live Project](https://hng-fe-stage3-habit-tracker.vercel.app)

---

## 📸 Preview

> The Habit Tracker PWA allows users to create, manage, and track daily habits with automated streak calculations. It features a robust local authentication system, deterministic data persistence via `localStorage`, and full offline support. The UI is optimized for all screen sizes (from 320px mobile to desktop) with full dark mode support.

---

## ✅ Core Features

- **Local Authentication** — Deterministic signup and login with persistent sessions.
- **Habit Management** — Create, edit, and delete habits with explicit confirmation flows.
- **Streak Tracking** — Real-time calculation of consecutive completion days.
- **PWA Ready** — Installable on mobile/desktop with offline app shell rendering.
- **Accessibility** — Full WCAG AA compliance with semantic HTML and keyboard navigation.
- **Responsive Design** — Fluid, mobile-first layout with premium dark mode aesthetics.

---

## 🚀 Getting Started

### Setup Instructions

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

### Run Instructions

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Instructions

Run the full test suite (Unit, Integration, and E2E):

```bash
npm run test
```

Or run specifically:

- `npm run test:unit`: Logic and utility tests.
- `npm run test:integration`: Component and flow tests.
- `npm run test:e2e`: Playwright end-to-end journey tests.

---

## 🗄️ Local Persistence Structure

The application uses `localStorage` for deterministic state management with the following keys:

- `habit-tracker-users`: Stores a JSON array of registered user objects (`id`, `email`, `password`, `createdAt`).
- `habit-tracker-session`: Stores the active session (`userId`, `email`) or `null`.
- `habit-tracker-habits`: Stores the global array of habits linked to their respective `userId`.

---

## 📶 PWA Implementation

The app is built as a fully functional PWA:

- **Service Worker (`public/sw.js`)**: Implements a cache-first strategy for the app shell, allowing the UI to render offline after the initial load.
- **Manifest (`public/manifest.json`)**: Configures the app name, short name, start URL, theme colors, and icons (192x192, 512x512) for home screen installation.
- **Registration**: The service worker is registered on the client via `src/app/layout.tsx`.

---

## 🧪 Test Mapping

Each required test file verifies specific behaviors defined in the TRD:

| Test File | Behavior Verified |
| :--- | :--- |
| `tests/unit/slug.test.ts` | URL-safe and stable slug generation for habit names. |
| `tests/unit/validators.test.ts` | Validation rules for habit names (presence, length). |
| `tests/unit/streaks.test.ts` | Accurate calculation of current streaks and daily breakage logic. |
| `tests/unit/habits.test.ts` | Immutable toggle logic for habit completions and duplicate prevention. |
| `tests/integration/auth-flow.test.tsx` | Auth UI state transitions, error messaging, and storage updates. |
| `tests/integration/habit-form.test.tsx` | Habit lifecycle UI (creation, editing, deletion confirmation). |
| `tests/e2e/app.spec.ts` | End-to-end user journeys and offline PWA reliability. |

---

## ⚖️ Trade-offs & Limitations

- **Browser Storage**: By using `localStorage`, user data is local to the specific browser and device. Clearing site data will result in data loss as there is no cloud synchronization in this stage.
- **ID Generation**: Implemented a fallback for `crypto.randomUUID()` to support non-secure HTTP contexts (common during local mobile previews), sacrificing some entropy for runtime stability.
- **Offline Data**: While the app shell is cached, the initial load still requires a network connection to register the Service Worker and cache assets.

---

## ♿ Accessibility Expectations Met

- **Semantic HTML** — Uses `<main>`, `<header>`, and `<section>` landmarks for structural clarity.
- **Linked Labels** — All form inputs are explicitly linked to visible labels via `id` and `htmlFor`.
- **Keyboard Navigation** — All interactive controls (buttons, toggles) are reachable via `Tab` and activatable via `Enter/Space`.
- **Aria Attributes** — Icon buttons include `aria-label` and `aria-pressed` states for screen readers.

---

## 🗂️ Architecture & Project Structure

```text
├── src
│   ├── app              # Next.js App Router (Routes & Layouts)
│   ├── components       # Modular React Components (Auth, Habits, Shared)
│   ├── lib              # Business Logic & Utilities (Auth, Streaks, Storage)
│   ├── types            # TypeScript Interface Definitions
│   └── tests            # Comprehensive Test Suite (Unit, Integration, E2E)
├── public               # PWA Assets (Manifest, Icons, Service Worker)
└── package.json         # Build scripts and project dependencies
```

---

## 🛠️ Built With

- **Framework** — Next.js 16.2 / React 19.2
- **Styling** — Tailwind CSS (Mobile-First / Dark Mode)
- **Testing** — Vitest / Playwright
- **State** — Deterministic `localStorage`

---

## 👤 Author

**Marvellous**  
GitHub: [@MARVER1X](https://github.com/MARVER1X)
