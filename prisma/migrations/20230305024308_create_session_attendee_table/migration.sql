-- CreateTable
CREATE TABLE "SessionAttendee" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "SessionAttendee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionAttendee" ADD CONSTRAINT "SessionAttendee_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAttendee" ADD CONSTRAINT "SessionAttendee_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
