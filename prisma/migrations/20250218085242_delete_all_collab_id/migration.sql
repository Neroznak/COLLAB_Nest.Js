/*
  Warnings:

  - You are about to drop the column `collabId` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `collabId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `collabId` on the `Referal` table. All the data in the column will be lost.
  - Added the required column `collabHash` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collabHash` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collabHash` to the `Referal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_collabId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_collabId_fkey";

-- DropForeignKey
ALTER TABLE "Referal" DROP CONSTRAINT "Referal_collabId_fkey";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "collabId",
ADD COLUMN     "collabHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "collabId",
ADD COLUMN     "collabHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Referal" DROP COLUMN "collabId",
ADD COLUMN     "collabHash" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_collabHash_fkey" FOREIGN KEY ("collabHash") REFERENCES "Collab"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_collabHash_fkey" FOREIGN KEY ("collabHash") REFERENCES "Collab"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referal" ADD CONSTRAINT "Referal_collabHash_fkey" FOREIGN KEY ("collabHash") REFERENCES "Collab"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;
