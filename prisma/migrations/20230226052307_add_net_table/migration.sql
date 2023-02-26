-- CreateTable
CREATE TABLE "Net" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coordinates" geography(Point) NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Net_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "net_coordinates_index" ON "Net" USING GIST ("coordinates");

-- RenameIndex
ALTER INDEX "location_idx" RENAME TO "player_coordinates_index";
