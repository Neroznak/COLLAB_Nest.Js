/*
  Warnings:

  - A unique constraint covering the columns `[referal]` on the table `Referal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Referal_referal_key" ON "Referal"("referal");
