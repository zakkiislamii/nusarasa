import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const tes = await prisma.users.findMany({});
  return NextResponse.json({ tes });
};
