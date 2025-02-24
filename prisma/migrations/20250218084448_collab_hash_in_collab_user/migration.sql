/*
  Warnings:

  - You are about to drop the column `collabId` on the `CollabUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,collabHash]` on the table `CollabUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collabHash` to the `CollabUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollabUser" DROP CONSTRAINT "CollabUser_collabId_fkey";

-- DropIndex
DROP INDEX "CollabUser_userId_collabId_key";

-- AlterTable
ALTER TABLE "Collab" ALTER COLUMN "hash" DROP DEFAULT;

-- AlterTable
ALTER TABLE "CollabUser" DROP COLUMN "collabId",
ADD COLUMN     "collabHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CollabUser_userId_collabHash_key" ON "CollabUser"("userId", "collabHash");

-- AddForeignKey
ALTER TABLE "CollabUser" ADD CONSTRAINT "CollabUser_collabHash_fkey" FOREIGN KEY ("collabHash") REFERENCES "Collab"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;
