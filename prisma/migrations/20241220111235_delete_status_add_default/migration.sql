/*
  Warnings:

  - You are about to drop the column `status` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Course` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('IT', 'DESIGN', 'MANAGEMENT');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "status",
DROP COLUMN "tags",
ALTER COLUMN "completionRate" SET DEFAULT 0.0,
DROP COLUMN "category",
ADD COLUMN     "category" "Categories" NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE TEXT,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "studentsCount" SET DEFAULT 0,
ALTER COLUMN "groupSize" SET DEFAULT 5;
