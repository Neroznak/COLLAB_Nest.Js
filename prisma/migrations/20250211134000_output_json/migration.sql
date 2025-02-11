/*
  Warnings:

  - The `output` column on the `Attempt` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "output",
ADD COLUMN     "output" JSONB;
