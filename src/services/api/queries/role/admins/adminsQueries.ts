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
        address: true,
        number_phone: true,
        balance: true,
        carts: {
          select: {
            id_cart: true,
            id_user: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            items: {
              select: {
                id_cartItem: true,
                quantity: true,
                id_cart: true,
                id_product: true,
                id_store: true,
                createdAt: true,
                updatedAt: true,
                product: {
                  select: {
                    product_name: true,
                    price: true,
                  },
                },
                store: {
                  select: {
                    store_name: true,
                  },
                },
              },
            },
          },
        },
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
                quantity: true,
              },
            },
          },
        },
      },
    });
  }
};
