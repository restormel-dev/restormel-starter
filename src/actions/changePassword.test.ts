/**
 * Unit tests for changePassword Server Action (Restormel security rules).
 * Mocks @/lib/auth and @/lib/db — no real database.
 */
import { createHash } from 'node:crypto';
import { changePassword } from './changePassword';

const mockAuth = jest.fn();
const mockUserFindUnique = jest.fn();
const mockUserUpdate = jest.fn();

jest.mock('@/lib/auth', () => ({
  auth: (...args: unknown[]) => mockAuth(...args),
}));

jest.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: (...args: unknown[]) => mockUserFindUnique(...args),
      update: (...args: unknown[]) => mockUserUpdate(...args),
    },
  },
}));

/** Build stored hash in same format as action (salt:sha256(salt+plain)) for mocks. */
function storedHashFor(plain: string): string {
  const salt = 'test-salt-16bytes!!';
  const hash = createHash('sha256').update(salt + plain).digest('hex');
  return `${salt}:${hash}`;
}

function formData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.set('currentPassword', overrides.currentPassword ?? 'current-secret');
  fd.set('newPassword', overrides.newPassword ?? 'newpassword123');
  fd.set('confirmPassword', overrides.confirmPassword ?? 'newpassword123');
  return fd;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('changePassword', () => {
  describe('Auth Check', () => {
    it('returns { error: "Unauthorized" } if auth() returns null', async () => {
      mockAuth.mockResolvedValue(null);

      const result = await changePassword(undefined, formData());

      expect(result).toEqual({ error: 'Unauthorized' });
      expect(mockUserUpdate).not.toHaveBeenCalled();
    });
  });

  describe('Zod Validation', () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue({ id: 'user-1' });
    });

    it('fails if newPassword is too short (<8 chars)', async () => {
      const result = await changePassword(
        undefined,
        formData({ newPassword: 'short', confirmPassword: 'short' })
      );

      expect(result.error).toBeDefined();
      expect(result.error).toMatch(/at least 8 characters|8 characters/i);
      expect(mockUserUpdate).not.toHaveBeenCalled();
    });
  });

  describe('Current password verification', () => {
    it('returns error when current password does not match DB', async () => {
      mockAuth.mockResolvedValue({ id: 'user-1' });
      mockUserFindUnique.mockResolvedValue({
        passwordHash: storedHashFor('correct-current'),
      });

      const result = await changePassword(
        undefined,
        formData({ currentPassword: 'wrong-current' })
      );

      expect(result.error).toBe('Current password is incorrect');
      expect(mockUserUpdate).not.toHaveBeenCalled();
    });
  });

  describe('Zod Confirmation', () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue({ id: 'user-1' });
    });

    it('fails if confirmPassword does not match newPassword', async () => {
      const result = await changePassword(
        undefined,
        formData({ newPassword: 'validpass123', confirmPassword: 'otherpass99' })
      );

      expect(result.error).toBeDefined();
      expect(result.error).toMatch(/do not match|confirmation/i);
      expect(mockUserUpdate).not.toHaveBeenCalled();
    });
  });

  describe('Happy Path', () => {
    it('calls db.user.update with the hashed password when inputs are valid', async () => {
      mockAuth.mockResolvedValue({ id: 'user-123' });
      mockUserFindUnique.mockResolvedValue({
        passwordHash: storedHashFor('old'),
      });
      mockUserUpdate.mockResolvedValue(undefined);

      const fd = formData({
        currentPassword: 'old',
        newPassword: 'mynewpassword',
        confirmPassword: 'mynewpassword',
      });

      const result = await changePassword(undefined, fd);

      expect(result.success).toBe('Password updated successfully');
      expect(mockUserUpdate).toHaveBeenCalledTimes(1);
      const [callArg] = mockUserUpdate.mock.calls[0] as [
        { where: { id: string }; data: { passwordHash: string } },
      ];
      expect(callArg.where).toEqual({ id: 'user-123' });
      expect(callArg.data.passwordHash).toBeDefined();
      expect(typeof callArg.data.passwordHash).toBe('string');
      expect(callArg.data.passwordHash).not.toBe('mynewpassword');
      expect(callArg.data.passwordHash.length).toBeGreaterThan(8);
    });
  });

  describe('Error Leaking', () => {
    it('returns a generic error message and NOT the raw error when DB throws', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      try {
        mockAuth.mockResolvedValue({ id: 'user-1' });
        mockUserFindUnique.mockResolvedValue({
          passwordHash: storedHashFor('current-secret'),
        });
        const rawError = 'Connection refused: postgres://localhost:5432';
        mockUserUpdate.mockRejectedValue(new Error(rawError));

        const result = await changePassword(undefined, formData());

        expect(result.error).toBeDefined();
        expect(result.error).toMatch(/Unable to update password/i);
        expect(result.error).not.toContain(rawError);
        expect(result.error).not.toContain('Connection refused');
      } finally {
        consoleSpy.mockRestore();
      }
    });
  });
});
