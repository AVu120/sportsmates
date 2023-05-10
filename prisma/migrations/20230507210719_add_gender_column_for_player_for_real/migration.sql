-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "gender" TEXT;

ALTER TABLE "Player" ADD CONSTRAINT "player_gender" CHECK ("gender" IN ('male', 'female'))