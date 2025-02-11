/*
  Warnings:

  - You are about to drop the column `answer` on the `Task` table. All the data in the column will be lost.
  - Added the required column `output` to the `Attempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attempt" ADD COLUMN     "isPassed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "output" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "answer",
ADD COLUMN     "testCases" JSONB;
