/*
  Warnings:

  - You are about to drop the column `title` on the `Theory` table. All the data in the column will be lost.
  - Added the required column `titleId` to the `Theory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskTheory" ADD COLUMN     "titleId" INTEGER;

-- AlterTable
ALTER TABLE "Theory" DROP COLUMN "title",
ADD COLUMN     "titleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Theory" ADD CONSTRAINT "Theory_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTheory" ADD CONSTRAINT "TaskTheory_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE SET NULL ON UPDATE CASCADE;
