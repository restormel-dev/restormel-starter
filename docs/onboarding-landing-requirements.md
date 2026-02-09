# Onboarding Landing Page — Requirements

**Route:** `/` (root)  
**Audience:** New users who have just run `npm run dev` after creating a project with `npx restormel`.

---

## 1. Purpose

The page is the **first screen** users see. It should:

- **Inform** them what is already set up in the project (security, auth, DB, tooling).
- **Guide** them on immediate next steps: running in Cursor, Git setup, and using a Cursor prompt to define their app and get a tailored plan.
- **Avoid** overwhelming them; keep copy concise and scannable.

---

## 2. Sections the Page Should Have

| Section                               | Content                                                                                                                                                         |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero / welcome**                    | Short headline that this is their Restormel project and they’re ready to build.                                                                                 |
| **What’s already set up**             | Bullet list of what the template provides (e.g. Next.js 14, auth, DB client, Zod, ESLint security, Tailwind, etc.). No implementation details; high-level only. |
| **Run in Cursor**                     | How to open the project in Cursor and run `npm run dev` (or that they may have already done so). One short paragraph.                                           |
| **Git and push**                      | Brief guidance: init repo if needed, add remote, first push. Emphasise safe habits (e.g. no secrets in repo, use `.env`).                                       |
| **Next: define your app with Cursor** | Intro to the “Cursor prompt” below: run it in **Plan mode** so the agent asks questions and then recommends a stack and plan.                                   |
| **Copyable Cursor prompt**            | A single, copyable block containing the prompt. Optional **Copy** button for better UX.                                                                         |

Sections should be clearly separated (headings, spacing). No forms, no server state—static content only.

---

## 3. Cursor Prompt Behaviour (Requirements for the Prompt Text)

The copyable prompt must be written so that when run in **Plan mode**, the agent:

1. **Assumes a role**  
   The prompt gives the agent a clear role (e.g. technical architect or product-minded engineer) so it behaves consistently and asks clarifying questions.

2. **Asks the user questions first**  
   The agent must **ask the user** about:
   - Their project / product idea
   - Target users and outcomes
   - Constraints (team size, timeline, hosting preferences, etc.)  
     It must **not** recommend a stack or plan until it has enough context from this conversation.

3. **Recommends a tech stack from the conversation**  
   Based on the user’s answers, the agent **recommends** a tech stack that fits (e.g. hosting, database, auth, payments, email).  
   The prompt must **not** pre-empt or prescribe specific services (e.g. no “use Vercel, Supabase, Stripe” inside the prompt). The agent discovers what’s appropriate by asking questions.

4. **Produces a short plan after alignment**  
   Once the user and agent are aligned, the agent produces a concise plan that includes:
   - Main areas of the app (e.g. marketing site, dashboard, API)
   - Chosen stack (as discovered)
   - First few concrete tasks to implement

The prompt text itself must be **role + process only** (ask questions → recommend stack → plan). No hard-coded list of services in the prompt.

---

## 4. Tech Stack on the Page (Reference Only)

- **On the landing page:** It is **allowed** to show an optional “Reference stack examples” or “Services you might use” list (e.g. Vercel, Supabase, Polar, Resend, etc.) so users see what kinds of things might come up.
- **Purpose:** Purely **informational**—to set expectations and spark ideas. Not part of the Cursor prompt.
- **In the Cursor prompt:** The prompt must **not** list or prescribe these (or any) services. Stack comes from the Q&A with the user.

So: page can mention example services as reference; prompt stays discovery-based and non-prescriptive.

---

## 5. Implementation Constraints

- **Static content only:** No secrets, no env vars, no user-specific data. Safe to cache and deploy as static.
- **No `dangerouslySetInnerHTML`:** All content must be plain text or React-rendered markup. No raw HTML from strings.
- **Prefer Server Components:** Implement the page as a Server Component by default. Use Client Components only where needed (e.g. optional Copy button).
- **Copy button (optional):** If a “Copy” control is added for the Cursor prompt, it must be isolated in a small Client Component; the rest of the page remains server-rendered.
- **No auth required:** The onboarding page is public and does not require sign-in.
- **Accessibility:** Use semantic HTML and ensure the copyable block is focusable and usable with keyboard and screen readers.
- **Mobile-first:** Layout and typography must work on small screens first (per project standards).

---

## Summary for Implementer

- **What:** A single onboarding landing page at `/`.
- **Content:** Welcome, what’s set up, run in Cursor, Git/push, “next step” intro, and a **copyable Cursor prompt** that in Plan mode: assigns a role, asks questions, recommends a stack (without prescribing it), then produces a short plan.
- **Page:** May list example services as reference only; prompt must not.
- **Tech:** Static, Server Component by default, no secrets or `dangerouslySetInnerHTML`, optional Client Component for Copy.
