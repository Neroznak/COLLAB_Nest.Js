-- CreateTable
CREATE TABLE "Referal" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referal" TEXT NOT NULL,
    "collabId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Referal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Referal" ADD CONSTRAINT "Referal_collabId_fkey" FOREIGN KEY ("collabId") REFERENCES "Collab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referal" ADD CONSTRAINT "Referal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
