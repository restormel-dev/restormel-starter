'use server';

import { z } from 'zod';
import { auth, updatePassword } from '@/lib/auth';

const MIN_LENGTH = 8;

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(MIN_LENGTH, `New password must be at least ${MIN_LENGTH} characters`),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirmation do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordState =
  | { success: string; error?: undefined }
  | { error: string; success?: undefined };

export async function changePassword(
  _prevState: ChangePasswordState | undefined,
  formData: FormData
): Promise<ChangePasswordState> {
  // 1. Authentication Check
  const session = await auth();
  if (!session) return { error: 'Unauthorized' };

  // 2. Input Validation (Zod)
  const parsed = changePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const message =
      first.currentPassword?.[0] ??
      first.newPassword?.[0] ??
      first.confirmPassword?.[0] ??
      'Invalid input';
    return { error: message };
  }

  // 3. Database / Auth Operation (Try/Catch)
  try {
    await updatePassword(session.id, parsed.data.newPassword);
    return { success: 'Password updated successfully' };
  } catch (e) {
    // 4. Secure Error Handling (No Stack Traces to Client)
    console.error('Change Password Failed:', e);
    return { error: 'Unable to update password. ID: ' + Date.now() };
  }
}
