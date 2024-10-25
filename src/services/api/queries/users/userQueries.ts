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
export const findManyUsers = async () => {
  return await prisma.users.findMany({});
};

//register
export const registerUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  return await prisma.users.create({ data: { email, password, username } });
};

//cek username dan email
export const existingUser = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  const data = await prisma.users.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });
  return data;
};

export const deleterUserById = async ({ id }: { id: string }) => {
  const data = await prisma.users.delete({
    where: { id_user: id },
  });
  return data;
};

//cek id
export const existingDeleteUser = async ({ id }: { id: string }) => {
  const data = await prisma.users.findFirst({
    where: { id_user: id },
  });
  return data;
};

export const findUser = async ({ username }: { username: string }) => {
  const data = await prisma.users.findFirst({ where: { username: username } });
  return data;
};

export const saveToken = async ({
  token,
  username,
}: {
  token: string;
  username: string;
}) => {
  const data = prisma.users.update({
    where: { username },
    data: { token },
  });
  return data;
};

//data diri
export const updateUserByToken = async ({
  fullname,
  address,
  number_phone,
  token,
}: {
  fullname: string;
  address: string;
  number_phone: string;
  token: string;
}) => {
  const data = await prisma.users.update({
    where: { token },
    data: { fullname, address, number_phone },
  });
  return data;
};

export const getProfileById = async ({ token }: { token: string }) => {
  const data = await prisma.users.findUnique({
    where: { token: token },
    select: {
      fullname: true,
      username: true,
      address: true,
      number_phone: true,
      email: true,
      balance: true,
    },
  });
  return data;
};

export const userWithRole = async ({ email }: { email: string }) => {
  const data = await prisma.users.findUnique({
    where: { email: email },
    select: {
      role: true,
    },
  });
  return data;
};

export const FindUserBasedOnTheToken = async ({
  token,
  email,
  username,
}: {
  token: string;
  email?: string;
  username?: string;
}) => {
  // Find the user based on the provided token
  const existingUser = await prisma.users.findUnique({
    where: { token },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Check for existing email
  if (email !== undefined && email !== existingUser.email) {
    const emailExists = await prisma.users.findUnique({
      where: { email },
    });
    if (emailExists && emailExists.id_user !== existingUser.id_user) {
      return { exists: true, field: "email" };
    }
  }

  // Check for existing username
  if (username !== undefined && username !== existingUser.username) {
    const usernameExists = await prisma.users.findUnique({
      where: { username },
    });
    if (usernameExists && usernameExists.id_user !== existingUser.id_user) {
      return { exists: true, field: "username" };
    }
  }

  return { exists: false };
};

export const editProfileUser = async ({
  fullname,
  address,
  number_phone,
  email,
  username,
  token,
}: {
  fullname?: string;

  address?: string;
  number_phone?: string;
  username?: string;
  email?: string;
  token: string;
}) => {
  // Build the update data object
  const updateData = {
    ...(fullname !== undefined && { fullname }),
    ...(address !== undefined && { address }),
    ...(number_phone !== undefined && { number_phone }),
    ...(email !== undefined && { email }),
    ...(username !== undefined && { username }),
  };

  // Proceed with the update
  const updatedUser = await prisma.users.update({
    where: { token },
    data: updateData,
  });

  return updatedUser;
};

export async function saveDataFromGoogle({
  fullname,
  email,
  username,
  token,
}: {
  fullname?: string;
  username?: string;
  email?: string;
  token: string;
}) {
  if (!email) {
    throw new Error("Email is required to save user data.");
  }
  const data = await prisma.users.upsert({
    where: { email },
    create: { fullname, email, username, token },
    update: { fullname, username, token },
  });
  return data;
}

export const findUserByEmail = async ({ email }: { email: string }) => {
  const data = await prisma.users.findUnique({ where: { email: email } });
  return data;
};
