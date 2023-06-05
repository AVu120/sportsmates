-- CreateTable
CREATE TABLE "PlayerSport" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "sport" TEXT NOT NULL,

    CONSTRAINT "PlayerSport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerSport" ADD CONSTRAINT "PlayerSport_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
