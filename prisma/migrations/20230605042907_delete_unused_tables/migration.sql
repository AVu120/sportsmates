/*
  Warnings:

  - You are about to drop the `Meetup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetupAttendee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Net` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meetup" DROP CONSTRAINT "Meetup_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Meetup" DROP CONSTRAINT "Meetup_netId_fkey";

-- DropForeignKey
ALTER TABLE "MeetupAttendee" DROP CONSTRAINT "MeetupAttendee_meetupId_fkey";

-- DropForeignKey
ALTER TABLE "MeetupAttendee" DROP CONSTRAINT "MeetupAttendee_playerId_fkey";

-- DropTable
DROP TABLE "Meetup";

-- DropTable
DROP TABLE "MeetupAttendee";

-- DropTable
DROP TABLE "Net";
