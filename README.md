# Restormel — Bank-Grade Secure Next.js Starter

A **Next.js 14** starter kit built for security-first development. Clone, install, and start building with four layers of defense, Zod validation, and clear architecture so you ship with confidence.

This repo is the **official Restormel starter template** and is used by the Restormel CLI in two ways:

| Mode | What the CLI does |
|------|-------------------|
| **Greenfield** | Runs `npx create-next-app@latest -e https://github.com/adamboon1984-arch/restormel-starter PROJECT_NAME`. This repo must be a valid create-next-app example (package.json and Next.js app at **repo root**). |
| **Brownfield** | Fetches `https://raw.githubusercontent.com/adamboon1984-arch/restormel-starter/main/.cursorrules` and writes it into the user’s project root. The **canonical** Restormel security/architecture rules live in `.cursorrules` at the repo root. |

Do not nest the Next.js app in a subdirectory; keep the app at the root so `create-next-app -e <this-repo>` works without `--example-path`.

---

## The Restormel Standard: Four Layers of Defense

Restormel wraps your app in four enforceable layers so insecure patterns are caught before they reach production.

| Layer | Tool | What it does |
|-------|------|----------------|
| **1. Code security** | **ESLint + eslint-plugin-security** | Flags dangerous patterns (e.g. `eval`, `dangerouslySetInnerHTML`, non-literal `require`) in the editor and in CI. |
| **2. Dependency & architecture** | **Dependency Cruiser** | Enforces import rules (e.g. no server-only code in client components) and detects circular dependencies. |
| **3. Pre-commit guard** | **Husky** | Runs tests (and optionally lint/audit) on every commit so broken or insecure code doesn’t get committed. |
| **4. AI alignment** | **Cursor Rules (`.cursorrules`)** | Keeps Cursor/AI output aligned with Restormel’s security and architecture rules (Server First, Zod, no leaks). |

Together, these give you **lint-time**, **build-time**, **commit-time**, and **AI-assisted** safety.

---

## Getting Started

```bash
git clone <your-repo-url>
cd restormel   # or your project folder
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’re ready to build.

- **Lint:** `npm run lint`
- **Build:** `npm run build`
- **Start (production):** `npm run start`
- **Test:** `npm run test` (Vitest)

---

## The Audit

Restormel includes a security audit script that runs several checks in one go:

```bash
npm run audit
```

**What it checks:**

1. **Critical files** — Ensures `.cursorrules`, `README.md`, and `package.json` exist.
2. **Dangerous patterns** — Scans `src/` for `dangerouslySetInnerHTML`, `eval(`, and accidental Stripe secret keys (`sk_live_`).
3. **Dependencies** — Runs `npm audit --audit-level=high`; fails if high/critical vulnerabilities are found.
4. **Architecture** — Runs Dependency Cruiser so server-only modules aren’t imported from client code and other rules in `.dependency-cruiser.js` are satisfied.

If any check fails, the command exits with a non-zero code so you can plug it into CI. Fix reported issues (e.g. `npm audit fix`, remove dangerous patterns, or fix imports) and re-run until it passes.

---

## Architecture

Two patterns are central to how this starter is structured.

### Colocation

Tests and implementation live next to each other:

- `src/components/Button/Button.tsx`
- `src/components/Button/Button.test.tsx`

Feature-related code is grouped by feature where it makes sense, and barrels (`index.ts`) are avoided in favor of explicit imports.

### Server Actions (the fortress)

Server Actions follow a strict, secure pattern:

1. **Authentication** — Check session (or equivalent) before doing anything.
2. **Validation** — Parse and validate all input with **Zod** (e.g. from `FormData`).
3. **Database / side effects** — Perform the operation inside `try/catch`.
4. **Error handling** — Log server-side; return generic, safe messages to the client (no stack traces or internals).

Client components stay thin: they handle UI and loading states (e.g. `useFormStatus`) and never import server-only modules or secrets.

These patterns are codified in **`.cursorrules`** so both humans and AI stay consistent with Restormel’s standards.

---

## Tech Stack

- **Runtime & framework:** Next.js 14 (App Router), React 19, TypeScript  
- **Validation:** Zod  
- **Styling:** Tailwind CSS  
- **Quality & security:** ESLint, eslint-plugin-security, Dependency Cruiser, Husky, Vitest
- **Dependency security:** Vitest 4+ is used (instead of Jest) to avoid deprecated/vulnerable transitive deps (e.g. `glob@7`, `inflight`) and to satisfy the esbuild/vite dev-server advisory (GHSA-67mh-4wv8-2f99). An `overrides` entry for `glob` ensures any remaining dependents resolve to a secure version.  
- **Database (example setup):** Postgres (e.g. via Drizzle/Prisma); adapt to your stack  

---

## License

MIT. See [LICENSE](./LICENSE) for details.
