import {
  findManyUsers,
  registerUser,
  existingUser,
  deleterUserById,
  existingDeleteUser,
  findUser,
  saveToken,
  updateUserByToken,
  getProfileById,
  editProfileUser,
  FindUserBasedOnTheToken,
} from "../queries/userQueries";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt/";
import { createToken } from "@/utils/token";

export const getAllUsers = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
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
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
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
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        code: 405,
        status: "failed",
        message: "the method is wrong",
        error: "Method not allowed",
      },
      {
        status: 405,
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
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
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

export const login = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      { status: 401 }
    );
  }

  if (req.method !== "POST") {
    return NextResponse.json(
      {
        code: 405,
        status: "failed",
        message: "The method is wrong",
        error: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          code: 400,
          status: "failed",
          message: "Username and password are required",
          error: "Username and password have not been entered",
        },
        { status: 400 }
      );
    }

    const user = await findUser({ username });
    if (!user?.username) {
      return NextResponse.json(
        {
          code: 401,
          status: "failed",
          message: "Invalid Username or Password",
          error: "Username and password not found",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          code: 401,
          status: "failed",
          message: "Invalid Username or Password",
          error: "Username and password not found",
        },
        { status: 401 }
      );
    }

    const token = createToken({
      id_user: user.id_user,
      username: user.username,
    });

    const response = NextResponse.json(
      {
        code: 200,
        status: "Success",
        message: "Login successful",
        data: {
          email: user.email,
          username: user.username,
          token,
        },
      },
      { status: 200 }
    );

    saveToken({ token, username });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        status: "Error",
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

export const updatePersonalData = async (req: NextRequest) => {
  // Check API key

  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      { status: 401 }
    );
  }

  // Check HTTP method
  if (req.method !== "PUT") {
    return NextResponse.json(
      {
        code: 405,
        status: "Failed",
        message: "The method is wrong",
        error: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          code: 401,
          status: "Failed",
          error: "Unauthorized",
          message: "Missing or invalid Bearer token",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const { first_name, last_name, address, number_phone } = await req.json();

    // Update user data using the query function
    await updateUserByToken({
      first_name,
      last_name,
      address,
      number_phone,
      token,
    });

    return NextResponse.json(
      {
        code: 200,
        status: "Success",
        message: "Personal data updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating personal data:", error);
    return NextResponse.json(
      {
        code: 500,
        status: "Failed",
        error: "Internal Server Error",
        message: "An error occurred while updating personal data",
      },
      { status: 500 }
    );
  }
};

export const getProfile = async (req: NextRequest) => {
  // Check API key
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      { status: 401 }
    );
  }

  // Check HTTP method
  if (req.method !== "GET") {
    return NextResponse.json(
      {
        code: 405,
        status: "Failed",
        message: "The method is wrong",
        error: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    // Get Bearer token from header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          code: 401,
          status: "Failed",
          error: "Unauthorized",
          message: "Missing or invalid Bearer token",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Update user data using the query function
    const data = await getProfileById({ token });

    return NextResponse.json(
      {
        code: 200,
        status: "Success",
        message: "Successfully get user profile!",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating personal data:", error);
    return NextResponse.json(
      {
        code: 500,
        status: "Failed",
        error: "Internal Server Error",
        message: "An error occurred while get user profile",
      },
      { status: 500 }
    );
  }
};

export const editProfile = async (req: NextRequest) => {
  // Check API key
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      { status: 401 }
    );
  }

  // Check HTTP method
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        code: 405,
        status: "Failed",
        message: "The method is wrong",
        error: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    // Get Bearer token from header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          code: 401,
          status: "Failed",
          error: "Unauthorized",
          message: "Missing or invalid Bearer token",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const body = await req.json();
    const { first_name, last_name, address, number_phone, email, username } =
      body;

    const validationResult = await FindUserBasedOnTheToken({
      token,
      email,
      username,
    });
    if (validationResult.exists) {
      return NextResponse.json(
        {
          code: 409,
          status: "Failed",
          message: `${
            validationResult.field === "email" ? "Email" : "Username"
          } already exists`,
        },
        {
          status: 409,
        }
      );
    }

    // Update user data using the query function
    await editProfileUser({
      first_name,
      last_name,
      address,
      number_phone,
      email,
      username,
      token,
    });

    return NextResponse.json(
      {
        code: 200,
        status: "Success",
        message: "Personal data updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating personal data:", error);
    return NextResponse.json(
      {
        code: 500,
        status: "Failed",
        error: "Internal Server Error",
        message: "An error occurred while updating personal data",
      },
      { status: 500 }
    );
  }
};
