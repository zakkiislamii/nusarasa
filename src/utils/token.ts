import jwt from "jsonwebtoken";
const TOKEN_KEY = "bearerToken";
const EXPIRATION_KEY = "tokenExpiration";

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

export const saveToken = (token: string) => {
  const expirationTimeInMinutes = 50; // 5 minutes expiration
  const expirationTime = expirationTimeInMinutes * 60 * 1000; // Convert minutes to milliseconds

  // Save token to localStorage
  localStorage.setItem(TOKEN_KEY, token);

  // Set expiration time (current time + 5 minutes)
  const expirationDate = Date.now() + expirationTime;
  localStorage.setItem(EXPIRATION_KEY, expirationDate.toString());

  // Schedule token removal after expiration time
  setTimeout(() => {
    removeToken();
  }, expirationTime);
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiration = localStorage.getItem(EXPIRATION_KEY);

  // Check if token is expired
  if (expiration && Date.now() > parseInt(expiration)) {
    removeToken();
    return null;
  }
  return token;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_KEY);
};
