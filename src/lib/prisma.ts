import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prisma.$connect();
} else {
  if (!global.prisma) {
    global.prisma = prisma;
  }
}

export default prisma;
