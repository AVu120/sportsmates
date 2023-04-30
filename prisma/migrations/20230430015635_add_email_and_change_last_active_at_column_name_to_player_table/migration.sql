/*
  Warnings:

  - You are about to drop the column `lastActiveAt` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "lastActiveAt",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lastSignIn" TIMESTAMPTZ(3);

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");
