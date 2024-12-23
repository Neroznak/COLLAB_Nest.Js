/*
  Warnings:

  - You are about to drop the column `paymentHistory` on the `user` table. All the data in the column will be lost.
  - The `subscriptionPlane` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Subscriptions" AS ENUM ('UNSUBSCRIBED', 'BASE', 'PREMIUM');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "paymentHistory",
ALTER COLUMN "userName" SET DEFAULT 'User',
ALTER COLUMN "rating" SET DEFAULT 0,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "learningGoals" DROP NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT false,
DROP COLUMN "subscriptionPlane",
ADD COLUMN     "subscriptionPlane" "Subscriptions" NOT NULL DEFAULT 'UNSUBSCRIBED';

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "cost" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
