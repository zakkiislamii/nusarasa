import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  first_name,
  last_name,
  address,
  number_phone,
  token,
}: {
  first_name: string;
  last_name: string;
  address: string;
  number_phone: string;
  token: string;
}) => {
  const data = await prisma.users.update({
    where: { token },
    data: { first_name, last_name, address, number_phone },
  });
  return data;
};

export const getProfileById = async ({ token }: { token: string }) => {
  const data = await prisma.users.findUnique({
    where: { token: token },
    select: {
      first_name: true,
      last_name: true,
      username: true,
      address: true,
      number_phone: true,
      email: true,
    },
  });
  return data;
};

export const editProfileUser = async ({
  first_name,
  last_name,
  address,
  number_phone,
  email,
  username,
  token,
}: {
  first_name: string;
  last_name: string;
  address: string;
  number_phone: string;
  username: string;
  email: string;
  token: string;
}) => {
  // First, check if the user exists
  const existingUser = await prisma.users.findUnique({
    where: { token },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Build the update data object conditionally
  const updateData: Record<string, string> = {
    first_name,
    last_name,
    address,
    number_phone,
  };

  // Conditionally update email and username only if they are different
  if (email !== existingUser.email) {
    updateData.email = email;
  }
  if (username !== existingUser.username) {
    updateData.username = username;
  }

  // If user exists, proceed with update
  const data = await prisma.users.update({
    where: { token },
    data: updateData, // Only update the fields that are different
  });

  return data;
};
