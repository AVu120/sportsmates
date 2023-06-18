/*
  Warnings:

  - You are about to drop the column `sports` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `PlayerSport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerSport" DROP CONSTRAINT "PlayerSport_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "sports",
ADD COLUMN     "sport" TEXT;

-- DropTable
DROP TABLE "PlayerSport";
