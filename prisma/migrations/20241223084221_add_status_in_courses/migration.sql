/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[structure]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "status" TEXT DEFAULT 'New';

-- CreateIndex
CREATE UNIQUE INDEX "Course_description_key" ON "Course"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Course_structure_key" ON "Course"("structure");
