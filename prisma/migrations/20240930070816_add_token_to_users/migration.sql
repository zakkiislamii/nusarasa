/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_token_key" ON "Users"("token");
