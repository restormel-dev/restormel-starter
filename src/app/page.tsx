import { CopyPromptButton } from '@/components/CopyPromptButton';

const CURSOR_PROMPT = `You are acting as a technical architect for a new product. Your job is to help me turn this Restormel Next.js project into a real application.

Do not recommend a tech stack or implementation plan yet. First, ask me:

1. What is the product or project? (e.g. SaaS, marketing site, internal tool)
2. Who are the target users and what outcomes should they get?
3. Any constraints: team size, timeline, hosting preferences, budget, or must-use tools?

Based on my answers, recommend a concrete tech stack (hosting, database, auth, payments, email, etc.) that fits. Then produce a short plan: main areas of the app, the chosen stack, and the first few implementation tasks.

Run this conversation in Plan mode so we can align before any code changes.`;

export default function OnboardingLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Hero */}
        <section className="mb-12 sm:mb-14">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Your Restormel project is ready
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            You’re running a secure Next.js starter. Follow the steps below to get going.
          </p>
        </section>

        {/* Run locally (for anyone who landed here without running dev) */}
        <section className="mb-10 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">
            First time here?
          </h2>
          <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">
            Run{' '}
            <code className="rounded bg-amber-200/60 px-1.5 py-0.5 font-mono text-xs dark:bg-amber-900/50">
              npm run dev
            </code>{' '}
            in your project folder, then open{' '}
            <a href="http://localhost:3000" className="font-medium underline underline-offset-2">
              http://localhost:3000
            </a>
            .
          </p>
        </section>

        {/* What's already set up */}
        <section className="mb-12" aria-labelledby="whats-set-up">
          <h2 id="whats-set-up" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            What’s already set up
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-zinc-600 dark:text-zinc-400">
            <li>Next.js (App Router) with React Server Components</li>
            <li>TypeScript and Zod for validation</li>
            <li>Auth and database client wiring (Supabase)</li>
            <li>ESLint with security rules and Prettier</li>
            <li>Tailwind CSS and mobile-first layout</li>
            <li>Vitest for tests and Husky pre-commit hooks</li>
          </ul>
        </section>

        {/* Run in Cursor */}
        <section className="mb-12" aria-labelledby="run-in-cursor">
          <h2 id="run-in-cursor" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Run in Cursor
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Open this project in Cursor and run{' '}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-700">
              npm run dev
            </code>{' '}
            in the terminal. You may have already done that to see this page.
          </p>
        </section>

        {/* Git and push */}
        <section className="mb-12" aria-labelledby="git-push">
          <h2 id="git-push" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Git and push
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            If you haven’t already: init a repo (
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-700">
              git init
            </code>
            ), add your remote, and push. Keep secrets out of the repo—use{' '}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-700">
              .env
            </code>{' '}
            and never commit it.
          </p>
        </section>

        {/* Next: define your app with Cursor */}
        <section className="mb-10" aria-labelledby="cursor-prompt-intro">
          <h2
            id="cursor-prompt-intro"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Next: define your app with Cursor
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Copy the prompt below and run it in Cursor in <strong>Plan mode</strong>. The agent will
            ask you about your project and what you want to build, then recommend a tech stack and a
            short plan—without prescribing specific services upfront.
          </p>
        </section>

        {/* Copyable Cursor prompt */}
        <section className="mb-12" aria-labelledby="cursor-prompt-block">
          <div className="flex items-center justify-between gap-2">
            <h2
              id="cursor-prompt-block"
              className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Cursor prompt
            </h2>
            <CopyPromptButton text={CURSOR_PROMPT} />
          </div>
          <pre
            className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-100 p-4 text-sm leading-relaxed text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            tabIndex={0}
          >
            <code>{CURSOR_PROMPT}</code>
          </pre>
        </section>

        {/* Reference stack examples */}
        <section
          className="rounded-lg border border-zinc-200 bg-zinc-100/60 p-4 dark:border-zinc-700 dark:bg-zinc-800/40"
          aria-labelledby="reference-stack"
        >
          <h2
            id="reference-stack"
            className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Reference: services you might use
          </h2>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            The prompt above does not prescribe these. The agent will suggest what fits after you
            answer its questions.
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Vercel</li>
            <li>Supabase</li>
            <li>Polar</li>
            <li>Resend</li>
            <li>Stripe</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
