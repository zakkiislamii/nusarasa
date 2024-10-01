import jwt from "jsonwebtoken";

export const createToken = (user: { id_user: string; username: string }) => {
  const token = jwt.sign(
    {
      userId: user.id_user,
      username: user.username,
      iat: Date.now() / 1000,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.NEXT_PUBLIC_JWT_SECRET as string
  );
  return token;
};
