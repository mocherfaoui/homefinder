import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../prisma/generated/client';

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
