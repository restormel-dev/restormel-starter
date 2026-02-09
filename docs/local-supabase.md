# Local Supabase

Use local Supabase when developing without a hosted project.

## 1. Start local Supabase

```bash
npx supabase start
```

## 2. Get API URL and anon key

After `supabase start`, the CLI prints the local API URL and anon key. You can also find them in **Supabase Studio** (the local Studio URL is shown in the same output).

- **API URL** — use as `NEXT_PUBLIC_SUPABASE_URL`
- **anon key** — use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Configure the app

Create or edit `.env.local` in the project root and set:

```env
NEXT_PUBLIC_SUPABASE_URL=<your local API URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your local anon key>
```

Restart the Next.js dev server after changing env vars.
