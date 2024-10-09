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
  first_name,
  last_name,
  address,
  number_phone,
  email,
  username,
  token,
}: {
  first_name?: string;
  last_name?: string;
  address?: string;
  number_phone?: string;
  username?: string;
  email?: string;
  token: string;
}) => {
  // Build the update data object
  const updateData = {
    ...(first_name !== undefined && { first_name }),
    ...(last_name !== undefined && { last_name }),
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

export const saveDataFromGoogle = async ({
  first_name,
  last_name,
  email,
  username,
  token,
}: {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  token: string;
}) => {
  // Use upsert instead of update
  const upsertedUser = await prisma.users.upsert({
    where: {
      // Try to find user by email, as token might not exist in the database
      email: email || undefined,
    },
    create: {
      first_name,
      last_name,
      email,
      username,
      token,
    },
    update: {
      first_name,
      last_name,
      username, // avoid updating email to prevent conflicts
      token, // update the token in case it's different
    },
  });

  return upsertedUser;
};
