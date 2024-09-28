import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default class UsersController {
  // Create a new user
  static async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {
        first_name,
        last_name,
        password,
        address,
        number_phone,
        email,
        username,
      } = req.body;
      const user = await prisma.users.create({
        data: {
          first_name,
          last_name,
          password,
          address,
          number_phone,
          email,
          username,
        },
      });
      res.status(201).json(user);
    } catch {
      res.status(400).json({ error: "Unable to create user" });
    }
  }

  // Get all users
  static async getAll(req: NextApiRequest, res: NextApiResponse) {
    try {
      const users = await prisma.users.findMany();
      res.status(200).json(users);
    } catch {
      res.status(400).json({ error: "Unable to fetch users" });
    }
  }

  // Get a single user by ID
  static async getById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const user = await prisma.users.findUnique({
        where: { id_user: id as string },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch {
      res.status(400).json({ error: "Unable to fetch user" });
    }
  }

  // Update a user
  static async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const {
        first_name,
        last_name,
        password,
        address,
        number_phone,
        email,
        username,
      } = req.body;
      const updatedUser = await prisma.users.update({
        where: { id_user: id as string },
        data: {
          first_name,
          last_name,
          password,
          address,
          number_phone,
          email,
          username,
        },
      });
      res.status(200).json(updatedUser);
    } catch {
      res.status(400).json({ error: "Unable to update user" });
    }
  }

  // Delete a user
  static async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      await prisma.users.delete({
        where: { id_user: id as string },
      });
      res.status(204).end();
    } catch {
      res.status(400).json({ error: "Unable to delete user" });
    }
  }
}
