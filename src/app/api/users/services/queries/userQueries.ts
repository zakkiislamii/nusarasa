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
