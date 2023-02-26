/*
  Warnings:

  - You are about to drop the column `coordinate` on the `Player` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "location_idx";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "coordinate",
ADD COLUMN     "coordinates" geography(Point);

-- CreateIndex
CREATE INDEX "location_idx" ON "Player" USING GIST ("coordinates");
