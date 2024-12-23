/*
  Warnings:

  - You are about to drop the column `collabId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_collabId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "collabId";

-- CreateTable
CREATE TABLE "CollabUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "collabId" INTEGER NOT NULL,

    CONSTRAINT "CollabUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollabUser" ADD CONSTRAINT "CollabUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollabUser" ADD CONSTRAINT "CollabUser_collabId_fkey" FOREIGN KEY ("collabId") REFERENCES "Collab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
