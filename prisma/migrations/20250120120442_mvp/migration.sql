/*
  Warnings:

  - The values [CREATOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `capital` on the `Collab` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Collab` table. All the data in the column will be lost.
  - You are about to drop the column `isEdited` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `isPinned` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `reactions` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `expectedAnswer` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `maxScore` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `learningGoals` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `subscription` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReaderMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskOption` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taskId` to the `Collab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('STUDENT', 'ADMIN');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Collab" DROP CONSTRAINT "Collab_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReaderMessage" DROP CONSTRAINT "ReaderMessage_messageId_fkey";

-- DropForeignKey
ALTER TABLE "ReaderMessage" DROP CONSTRAINT "ReaderMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskOption" DROP CONSTRAINT "TaskOption_taskId_fkey";

-- AlterTable
ALTER TABLE "Collab" DROP COLUMN "capital",
DROP COLUMN "courseId",
ADD COLUMN     "taskId" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "isEdited",
DROP COLUMN "isPinned",
DROP COLUMN "reactions";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "description",
DROP COLUMN "expectedAnswer",
DROP COLUMN "maxScore",
DROP COLUMN "order",
DROP COLUMN "question",
DROP COLUMN "type",
ADD COLUMN     "category" "Categories" NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bio",
DROP COLUMN "dateOfBirth",
DROP COLUMN "isVerified",
DROP COLUMN "learningGoals",
DROP COLUMN "location",
DROP COLUMN "phoneNumber",
DROP COLUMN "rating",
DROP COLUMN "status",
DROP COLUMN "subscription";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "ReaderMessage";

-- DropTable
DROP TABLE "TaskOption";

-- CreateTable
CREATE TABLE "Theory" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Categories" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Theory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskTheory" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "taskId" INTEGER NOT NULL,
    "theoryId" INTEGER NOT NULL,

    CONSTRAINT "TaskTheory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "quote" TEXT NOT NULL,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskTheory_taskId_theoryId_key" ON "TaskTheory"("taskId", "theoryId");

-- AddForeignKey
ALTER TABLE "Collab" ADD CONSTRAINT "Collab_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTheory" ADD CONSTRAINT "TaskTheory_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTheory" ADD CONSTRAINT "TaskTheory_theoryId_fkey" FOREIGN KEY ("theoryId") REFERENCES "Theory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
