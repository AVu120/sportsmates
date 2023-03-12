/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionAttendee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_netId_fkey";

-- DropForeignKey
ALTER TABLE "SessionAttendee" DROP CONSTRAINT "SessionAttendee_playerId_fkey";

-- DropForeignKey
ALTER TABLE "SessionAttendee" DROP CONSTRAINT "SessionAttendee_sessionId_fkey";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "SessionAttendee";

-- CreateTable
CREATE TABLE "Meetup" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "netId" TEXT NOT NULL,
    "startDatetime" TIMESTAMPTZ(3) NOT NULL,
    "endDatetime" TIMESTAMPTZ(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "maxNumberOfAttendees" INTEGER NOT NULL,

    CONSTRAINT "Meetup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupAttendee" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "meetupId" TEXT NOT NULL,

    CONSTRAINT "MeetupAttendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meetup_hostId_netId_startDatetime_key" ON "Meetup"("hostId", "netId", "startDatetime");

-- CreateIndex
CREATE UNIQUE INDEX "Meetup_hostId_netId_endDatetime_key" ON "Meetup"("hostId", "netId", "endDatetime");

-- CreateIndex
CREATE UNIQUE INDEX "Meetup_hostId_netId_startDatetime_endDatetime_key" ON "Meetup"("hostId", "netId", "startDatetime", "endDatetime");

-- CreateIndex
CREATE UNIQUE INDEX "MeetupAttendee_playerId_meetupId_key" ON "MeetupAttendee"("playerId", "meetupId");

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_netId_fkey" FOREIGN KEY ("netId") REFERENCES "Net"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupAttendee" ADD CONSTRAINT "MeetupAttendee_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupAttendee" ADD CONSTRAINT "MeetupAttendee_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
