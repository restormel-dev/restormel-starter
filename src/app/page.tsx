/**
 * Root route placeholder. The Restormel CLI overwrites this file with the
 * post-install landing from restormel-platform. Replace with your app’s
 * home page when you build your product.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Next.js App</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Run{' '}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-700">
            npm run dev
          </code>{' '}
          to start the dev server.
        </p>
      </main>
    </div>
  );
}
