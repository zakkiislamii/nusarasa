import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsersByRole = async (role: string) => {
  if (role === "member") {
    return prisma.users.findMany({
      where: {
        role: "member",
      },
      select: {
        id_user: true,
        fullname: true,
        email: true,
        username: true,
      },
    });
  } else if (role === "seller") {
    return prisma.users.findMany({
      where: {
        role: "seller",
      },
      select: {
        id_user: true,
        fullname: true,
        email: true,
        username: true,
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
  }
};
