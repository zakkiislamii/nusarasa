-- CreateEnum
CREATE TYPE "Role" AS ENUM ('seller', 'admin', 'member');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'member';
