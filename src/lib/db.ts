/**
 * DB stub for Restormel scaffolding. Replace with real implementation (e.g. Prisma/Drizzle).
 */
export const db = {
  user: {
    findUnique: async (args: {
      where: { id: string };
      select: { passwordHash: true };
    }): Promise<{ passwordHash: string } | null> => {
      void args;
      return null;
    },
    update: async (_args: {
      where: { id: string };
      data: { passwordHash: string };
    }): Promise<unknown> => Promise.resolve(),
  },
};
