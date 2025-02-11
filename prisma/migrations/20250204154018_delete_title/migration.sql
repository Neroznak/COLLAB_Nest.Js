/*
  Warnings:

  - You are about to drop the column `titleId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `titleId` on the `TaskTheory` table. All the data in the column will be lost.
  - You are about to drop the column `titleId` on the `Theory` table. All the data in the column will be lost.
  - You are about to drop the `Title` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Theory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_titleId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTheory" DROP CONSTRAINT "TaskTheory_titleId_fkey";

-- DropForeignKey
ALTER TABLE "Theory" DROP CONSTRAINT "Theory_titleId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "titleId",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskTheory" DROP COLUMN "titleId";

-- AlterTable
ALTER TABLE "Theory" DROP COLUMN "titleId",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Title";
