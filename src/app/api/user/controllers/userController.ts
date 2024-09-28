import {
  findManyUsers,
  registerUser,
  existingUser,
  deleterUserById,
  existingDeleteUser,
} from "../queries/userQueries";
import { NextResponse, NextRequest } from "next/server";
import { API_KEY } from "../../config/config";
import bcrypt from "bcrypt/";

export const getAllUsers = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey === API_KEY) {
    try {
      const data = await findManyUsers();
      return NextResponse.json(
        {
          code: 200,
          status: "Success",
          message: "Users retrieved successfully",
          data,
        },
        {
          status: 200,
        }
      );
    } catch (error: unknown) {
      return NextResponse.json(
        {
          code: 500,
          status: "Error",
          message: "Internal server error",
          error,
        },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      {
        status: 401,
      }
    );
  }
};

export const register = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { email, password, confirm_password, username } = await req.json();
    // Validasi input
    if (!email || !password || !confirm_password || !username) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }
    const checked = await existingUser({ email, username });
    if (checked) {
      if (checked.username === username) {
        return NextResponse.json(
          {
            code: 409,
            status: "Failed",
            message: "Username already exists",
          },
          {
            status: 409,
          }
        );
      }

      if (checked.email === email) {
        return NextResponse.json(
          {
            code: 409,
            status: "Failed",
            message: "Email already exists",
          },
          {
            status: 409,
          }
        );
      }
    }

    if (password !== confirm_password) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "Passwords do not match",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registrasi pengguna
    await registerUser({
      email,
      password: hashedPassword,
      username,
    });

    return NextResponse.json(
      {
        code: 200,
        status: "Success",
        message: "User registered successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        code: 500,
        status: "Error",
        message: "Internal server error",
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
};

export const deleteUser = async (req: NextRequest, id: string) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      {
        status: 401,
      }
    );
  }

  try {
    if (!id) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "User ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const checked = await existingDeleteUser({ id });
    if (!checked) {
      return NextResponse.json(
        {
          code: 404,
          status: "Failed",
          error: "User Not Found",
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    } else {
      const deletedUser = await deleterUserById({ id });
      if (!deletedUser) {
        // Check if the user was deleted successfully
        return NextResponse.json(
          {
            code: 404,
            status: "Failed",
            error: "Not Found",
            message: "User not found",
          },
          {
            status: 404,
          }
        );
      } else {
        return NextResponse.json(
          {
            code: 200,
            status: "Success",
            message: "User has been deleted",
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        code: 500,
        status: "Error",
        message: "Internal server error",
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
};
