/*
  Warnings:

  - A unique constraint covering the columns `[userId,collabId]` on the table `CollabUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CollabUser_userId_collabId_key" ON "CollabUser"("userId", "collabId");
