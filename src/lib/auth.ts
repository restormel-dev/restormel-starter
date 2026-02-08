/**
 * Auth stub for Restormel scaffolding. Replace with real implementation (e.g. NextAuth).
 */
export type Session = { id: string; email?: string };

export async function auth(): Promise<Session | null> {
  // TODO: Replace with real session (e.g. getServerSession, cookies).
  return null;
}

/**
 * Stub: persist new password for the user. Replace with your auth provider (e.g. Supabase auth.updateUser).
 */
export async function updatePassword(
  _userId: string,
  _newPassword: string
): Promise<void> {
  // TODO: Implement with your auth provider or DB (hash password before storing).
  await Promise.resolve();
}
