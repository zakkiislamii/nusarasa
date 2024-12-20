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

export const createOrGetActiveCart = async ({ userId }: { userId: string }) => {
  // Ensure the user exists before creating a cart
  const user = await prisma.users.findUnique({
    where: { id_user: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // Proceed to find or create the cart if user exists
  let cart = await prisma.cart.findFirst({
    where: {
      id_user: userId,
      status: "active",
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        id_user: userId,
        status: "active",
      },
    });
  }

  return cart;
};
export const getCart = async ({ userId }: { userId: string }) => {
  const cart = await prisma.cart.findFirst({
    where: {
      id_user: userId,
      status: "active",
    },
    include: {
      items: {
        include: {
          product: true,
          store: true,
        },
      },
    },
  });

  if (!cart) {
    return null;
  }

  return {
    id_cart: cart.id_cart,
    status: cart.status,
    items: cart.items,
  };
};

export const addToCart = async ({
  userId,
  productId,
  quantity,
}: {
  userId: string;
  productId: string;
  quantity: number;
}) => {
  // Validasi quantity yang diminta
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  return await prisma.$transaction(async (tx) => {
    const cart = await createOrGetActiveCart({ userId });

    const product = await tx.products.findUnique({
      where: { id_product: productId },
      select: {
        id_store: true,
        quantity: true,
        product_name: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Validasi jika product quantity 0
    if (product.quantity === 0) {
      throw new Error(`${product.product_name} is out of stock`);
    }

    // Validasi jika quantity yang diminta melebihi stock
    if (product.quantity < quantity) {
      throw new Error(
        `Insufficient stock for ${product.product_name}. Available: ${product.quantity}`
      );
    }

    const existingItem = await tx.cartItem.findUnique({
      where: {
        id_cart_id_product: {
          id_cart: cart.id_cart,
          id_product: productId,
        },
      },
    });

    // Validasi total quantity setelah ditambahkan ke existing item
    if (existingItem) {
      const totalQuantity = existingItem.quantity + quantity;
      if (product.quantity < totalQuantity) {
        throw new Error(
          `Cannot add ${quantity} more items. Only ${product.quantity} available`
        );
      }
    }

    try {
      // Update product quantity
      await tx.products.update({
        where: { id_product: productId },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });

      if (existingItem) {
        return await tx.cartItem.update({
          where: {
            id_cartItem: existingItem.id_cartItem,
          },
          data: {
            quantity: existingItem.quantity + quantity,
          },
          include: {
            product: true,
            store: true,
          },
        });
      } else {
        return await tx.cartItem.create({
          data: {
            cart: {
              connect: { id_cart: cart.id_cart },
            },
            product: {
              connect: { id_product: productId },
            },
            store: {
              connect: { id_store: product.id_store },
            },
            quantity: quantity,
          },
          include: {
            product: true,
            store: true,
          },
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  });
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  newQuantity: number
) => {
  // Validasi quantity baru
  if (newQuantity <= 0) {
    throw new Error("New quantity must be greater than 0");
  }

  return await prisma.$transaction(async (tx) => {
    const currentCartItem = await tx.cartItem.findUnique({
      where: { id_cartItem: cartItemId },
      include: { product: true },
    });

    if (!currentCartItem) {
      throw new Error("Cart item not found");
    }

    const quantityDifference = newQuantity - currentCartItem.quantity;

    // Jika menambah quantity
    if (quantityDifference > 0) {
      // Cek apakah product masih ada stock
      if (currentCartItem.product.quantity === 0) {
        throw new Error(
          `${currentCartItem.product.product_name} is out of stock`
        );
      }

      // Cek apakah stock mencukupi
      if (currentCartItem.product.quantity < quantityDifference) {
        throw new Error(
          `Cannot add ${quantityDifference} more items. Only ${currentCartItem.product.quantity} available`
        );
      }
    }

    // Update product quantity
    await tx.products.update({
      where: { id_product: currentCartItem.product.id_product },
      data: {
        quantity: {
          increment: -quantityDifference,
        },
      },
    });

    return await tx.cartItem.update({
      where: { id_cartItem: cartItemId },
      data: { quantity: newQuantity },
      include: {
        product: true,
        store: true,
      },
    });
  });
};

export const removeFromCart = async (cartItemId: string) => {
  return await prisma.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findUnique({
      where: { id_cartItem: cartItemId },
      select: {
        quantity: true,
        id_product: true,
        product: {
          select: {
            product_name: true,
          },
        },
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    // Kembalikan quantity ke product
    await tx.products.update({
      where: { id_product: cartItem.id_product },
      data: {
        quantity: {
          increment: cartItem.quantity,
        },
      },
    });

    return await tx.cartItem.delete({
      where: { id_cartItem: cartItemId },
    });
  });
};

export const getCartItems = async (userId: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      id_user: userId,
      status: "active",
    },
    include: {
      items: {
        include: {
          product: true,
          store: true,
        },
      },
    },
  });

  return cart;
};

export const getUserByToken = async (token: string) => {
  return await prisma.users.findUnique({
    where: {
      token: token,
    },
    select: {
      id_user: true,
    },
  });
};

export const checkout = async (id_user: string, id_cart: string) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Dapatkan cart dengan items dan product details
      const cart = await tx.cart.findFirst({
        where: {
          id_cart: id_cart,
          id_user: id_user,
          status: "active",
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: true,
        },
      });

      if (!cart) {
        throw new Error("Cart not found or inactive");
      }

      // 2. Hitung total harga
      const totalAmount = cart.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);

      // 3. Cek balance user
      if (cart.user.balance < totalAmount) {
        throw new Error("Insufficient balance");
      }

      // 4. Update stok produk
      for (const item of cart.items) {
        const product = await tx.products.findUnique({
          where: { id_product: item.product.id_product },
        });

        if (!product) {
          throw new Error(
            `Produk dengan ID ${item.product.id_product} tidak ditemukan`
          );
        }

        if (product.quantity < item.quantity) {
          throw new Error(
            `Stok produk ${product.product_name} tidak mencukupi`
          );
        }

        // Kurangi stok produk
        await tx.products.update({
          where: { id_product: item.product.id_product },
          data: {
            quantity: product.quantity - item.quantity,
          },
        });
      }

      // 5. Update balance user
      await tx.users.update({
        where: { id_user: id_user },
        data: {
          balance: cart.user.balance - totalAmount,
        },
      });

      // 6. Update status cart
      await tx.cart.update({
        where: { id_cart: id_cart },
        data: {
          status: "checkout",
        },
        include: {
          items: {
            include: {
              product: true,
              store: true,
            },
          },
        },
      });

      // 7. Hapus cart items
      // await tx.cartItem.deleteMany({
      //   where: {
      //     id_cart: id_cart,
      //   },
      // });

      // 8. Ambil data cart terbaru setelah items dihapus
      const finalCart = await tx.cart.findUnique({
        where: {
          id_cart: id_cart,
        },
        include: {
          items: {
            include: {
              product: true,
              store: true,
            },
          },
        },
      });

      // 9. Return updated data
      return {
        cart: finalCart,
        totalAmount,
        remainingBalance: cart.user.balance - totalAmount,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const checkoutHistory = async (id_user: string) => {
  const data = await prisma.cart.findMany({
    where: {
      id_user: id_user,
      status: "checkout",
    },
    include: {
      items: {
        include: {
          product: true,
          store: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

export const topUpMembers = async (token: string, balance: number) => {
  try {
    // Validate minimum amount
    if (balance < 10000) {
      throw new Error("Minimum top up amount is Rp 10.000");
    }

    // Validate user exists
    const existingUser = await prisma.users.findUnique({
      where: { token },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = await prisma.users.update({
      where: {
        token: token,
      },
      data: {
        balance: {
          increment: balance,
        },
      },
      select: {
        id_user: true,
        fullname: true,
        balance: true,
        email: true,
      },
    });
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred during top up");
  }
};
