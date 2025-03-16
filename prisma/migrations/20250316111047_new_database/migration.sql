/*
  Warnings:

  - You are about to drop the `HiddenMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskTheory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HiddenMessage" DROP CONSTRAINT "HiddenMessage_messageId_fkey";

-- DropForeignKey
ALTER TABLE "HiddenMessage" DROP CONSTRAINT "HiddenMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTheory" DROP CONSTRAINT "TaskTheory_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTheory" DROP CONSTRAINT "TaskTheory_theoryId_fkey";

-- DropTable
DROP TABLE "HiddenMessage";

-- DropTable
DROP TABLE "Quotes";

-- DropTable
DROP TABLE "TaskTheory";

-- DropTable
DROP TABLE "Theory";
