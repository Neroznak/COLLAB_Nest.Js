/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Collab` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collab_hash_key" ON "Collab"("hash");
