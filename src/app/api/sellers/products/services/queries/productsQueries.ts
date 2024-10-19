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
export const findManyProductsByToken = async (token: string) => {
  const data = await prisma.users.findUnique({
    where: {
      token: token,
    },
    select: {
      stores: {
        select: {
          id_store: true,
          store_name: true,
          products: {
            select: {
              id_product: true,
              product_name: true,
              price: true,
            },
          },
        },
      },
    },
  });
  return data;
};
