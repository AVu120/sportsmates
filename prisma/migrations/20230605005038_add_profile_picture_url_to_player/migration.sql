/*
  Warnings:

  - You are about to drop the column `profilePictureId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `profilePictureVersion` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profilePictureUrl]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_profilePictureId_key";

-- DropIndex
DROP INDEX "Player_profilePictureVersion_key";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "profilePictureId",
DROP COLUMN "profilePictureVersion",
ADD COLUMN     "profilePictureUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Player_profilePictureUrl_key" ON "Player"("profilePictureUrl");
