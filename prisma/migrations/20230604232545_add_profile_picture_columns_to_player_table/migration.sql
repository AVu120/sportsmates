/*
  Warnings:

  - A unique constraint covering the columns `[profilePictureId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profilePictureVersion]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "profilePictureId" TEXT,
ADD COLUMN     "profilePictureVersion" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "Player_profilePictureId_key" ON "Player"("profilePictureId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_profilePictureVersion_key" ON "Player"("profilePictureVersion");
