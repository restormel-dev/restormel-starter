'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  changePassword,
  type ChangePasswordState,
} from '@/features/change-password/changePassword';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 w-full rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
    >
      {pending ? 'Updating…' : 'Change password'}
    </button>
  );
}

const initialState: ChangePasswordState = { error: '' };

export function ChangePasswordForm() {
  const [state, formAction] = useFormState(changePassword, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      aria-label="Change password"
    >
      <h2 className="text-lg font-semibold text-foreground">
        Change password
      </h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Enter your current password and choose a new one.
      </p>

      <div className="mt-4 space-y-4">
        <label htmlFor="currentPassword" className="block text-sm font-medium">
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-foreground placeholder:text-neutral-500 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground dark:border-neutral-700"
          placeholder="••••••••"
        />

        <label htmlFor="newPassword" className="block text-sm font-medium">
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-foreground placeholder:text-neutral-500 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground dark:border-neutral-700"
          placeholder="••••••••"
        />

        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-foreground placeholder:text-neutral-500 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground dark:border-neutral-700"
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          className="mt-3 text-sm text-red-600 dark:text-red-400"
        >
          {state.error}
        </p>
      )}
      {state?.success && (
        <p
          role="status"
          className="mt-3 text-sm text-green-600 dark:text-green-400"
        >
          {state.success}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
