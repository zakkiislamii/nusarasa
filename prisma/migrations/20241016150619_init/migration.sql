-- CreateEnum
CREATE TYPE "Role" AS ENUM ('seller', 'admin', 'member');

-- CreateTable
CREATE TABLE "Users" (
    "id_user" TEXT NOT NULL,
    "fullname" TEXT,
    "password" TEXT,
    "address" TEXT,
    "number_phone" TEXT,
    "token" TEXT,
    "email" TEXT,
    "username" TEXT,
    "role" "Role" NOT NULL DEFAULT 'member',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Stores" (
    "id_store" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id_store")
);

-- CreateTable
CREATE TABLE "Products" (
    "id_product" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "id_store" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id_product")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_token_key" ON "Users"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Stores" ADD CONSTRAINT "Stores_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "Stores"("id_store") ON DELETE CASCADE ON UPDATE CASCADE;
