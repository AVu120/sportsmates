/*
  Warnings:

  - A unique constraint covering the columns `[playerId,sessionId]` on the table `SessionAttendee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SessionAttendee_playerId_sessionId_key" ON "SessionAttendee"("playerId", "sessionId");
