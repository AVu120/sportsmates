/*
  Warnings:

  - A unique constraint covering the columns `[hostId,netId,startDatetime]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hostId,netId,endDatetime]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_hostId_netId_startDatetime_key" ON "Session"("hostId", "netId", "startDatetime");

-- CreateIndex
CREATE UNIQUE INDEX "Session_hostId_netId_endDatetime_key" ON "Session"("hostId", "netId", "endDatetime");
