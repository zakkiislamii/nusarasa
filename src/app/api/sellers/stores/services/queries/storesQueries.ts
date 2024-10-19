/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

// getAll
export const findManyStores = async () => {
  return await prisma.stores.findMany({
    select: {
      id_store: true,
      id_user: true,
      user: {
        select: {
          fullname: true,
        },
      },
      store_name: true,
      products: {
        select: {
          id_product: true,
          product_name: true,
          price: true,
        },
      },
    },
  });
};
