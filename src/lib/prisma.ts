import { PrismaClient } from '../../prisma/generated/client';
import { sql } from '@vercel/postgres';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Eksporter sql fra Vercel Postgres SDK for direkte forespørgsler
export { sql }; 