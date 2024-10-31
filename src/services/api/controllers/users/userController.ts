/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  findManyUsers,
  registerUser,
  existingUser,
  deleterUserById,
  existingDeleteUser,
  findUser,
  updateUserByToken,
  getProfileById,
  editProfileUser,
  FindUserBasedOnTheToken,
  saveToken,
} from "../../queries/users/userQueries";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt/";
import { encrypt, getSession, getSessionForCheck } from "@/utils/token/token";
import {
  badRequestResponse,
  costumHandler,
  errorHandler,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
  unauthorizedTokenResponse,
} from "@/utils/response/responseHelpers";
import { isValidApiKey } from "@/utils/validation/validation";

export const getAllUsers = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const data = await findManyUsers();
      return successResponse("Users retrieved successfully", data);
    } catch (error: any) {
      return errorHandler(error, error.message);
    }
  } else {
    return unauthorizedResponse();
  }
};

export const register = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }
  if (req.method !== "POST") {
    return methodNotAllowedResponse();
  }

  try {
    const { email, password, confirm_password, username } = await req.json();

    // Validasi input
    if (!email || !password || !confirm_password || !username) {
      return badRequestResponse("All fields are required");
    }
    const checked = await existingUser({ email, username });
    if (checked) {
      if (checked.username === username) {
        return costumHandler(409, "Username already exists");
      }

      if (checked.email === email) {
        return costumHandler(409, "Email already exists");
      }
    }

    if (password !== confirm_password) {
      return badRequestResponse("Passwords do not match");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registrasi pengguna
    await registerUser({
      email,
      password: hashedPassword,
      username,
    });

    return successResponse("User registered successfully");
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};

export const deleteUser = async (req: NextRequest, id: string) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  try {
    if (!id) {
      return badRequestResponse("User ID is required");
    }
    const checked = await existingDeleteUser({ id });
    if (!checked) {
      return costumHandler(404, "User not found", "User not found");
    } else {
      const deletedUser = await deleterUserById({ id });
      if (!deletedUser) {
        return costumHandler(404, "Not found", "User not found");
      } else {
        return successResponse("User has been deleted");
      }
    }
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};

export const login = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "POST") {
    return methodNotAllowedResponse();
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return costumHandler(
        400,
        "Username and password are required",
        "Username and password have not been entered"
      );
    }

    const user = await findUser({ username });
    if (!user?.username) {
      return costumHandler(
        401,
        "Invalid Username or Password",
        "Username and password not found"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      return costumHandler(
        401,
        "Invalid Username or Password",
        "Username and password not found"
      );
    }

    // Declare `expired` before using it
    const expired = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create a session before using it
    const session = await encrypt({
      user: {
        id: user.id_user,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      expired,
    });

    await saveToken({ token: session, username });
    const response = successResponse("Login successful", {
      email: user.email,
      username: user.username,
      session,
    });

    // Set the session cookie
    response.cookies.set({
      name: "session",
      value: session,
      httpOnly: true,
      expires: expired, // Use `expired` from the correct scope
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};

export const updatePersonalData = async (req: NextRequest) => {
  // Check API key
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  // Check HTTP method
  if (req.method !== "PUT") {
    return methodNotAllowedResponse();
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return unauthorizedTokenResponse();
    }

    const token = authHeader.split(" ")[1];

    // Parse the request body
    const { fullname, address, number_phone } = await req.json();

    // Update user data using the query function (replace with your logic)
    await updateUserByToken({
      fullname,
      address,
      number_phone,
      token,
    });

    return successResponse("Personal data updated successfully");
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};

export const getProfile = async (req: NextRequest) => {
  // Check API key
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  // Check HTTP method
  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }

  try {
    // Get Bearer token from header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return unauthorizedTokenResponse();
    }

    const token = authHeader.split(" ")[1];

    // Update user data using the query function
    const data = await getProfileById({ token });

    return successResponse("Successfully get user profile!", data);
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};

export const editProfile = async (req: NextRequest) => {
  // Check API key
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  // Check HTTP method
  if (req.method !== "POST") {
    return methodNotAllowedResponse();
  }
  // Get Bearer token from header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }

  try {
    const token = authHeader.split(" ")[1];
    const body = await req.json();
    const { fullname, address, number_phone, email, username } = body;

    const validationResult = await FindUserBasedOnTheToken({
      token,
      email,
      username,
    });
    if (validationResult.exists) {
      return costumHandler(
        409,
        `${
          validationResult.field === "email" ? "Email" : "Username"
        } already exists`
      );
    }

    await editProfileUser({
      fullname,
      address,
      number_phone,
      email,
      username,
      token,
    });
    return successResponse("Personal data updated successfully");
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};
export const logout = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "POST") {
    return methodNotAllowedResponse();
  }
  // Get Bearer token from header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }

  const response = successResponse("Logged out successfully");

  response.cookies.set({
    name: "session",
    value: "",
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
};

export const checkAuth = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }
  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }

  const session = await getSessionForCheck();
  const token = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        code: 401,
        status: "failed",
        message: "Not authenticated",
        isLoggedIn: false,
      },
      { status: 401 }
    );
  }
  return successResponse("Authenticated", {
    isLoggedIn: true,
    session,
    token,
  });
};
