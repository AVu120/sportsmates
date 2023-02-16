-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "supabaseId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "skillLevel" TEXT,
    "birthday" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActiveAt" TIMESTAMP(3),
    "coordinate" geometry(Point, 4326),
    "city" TEXT,
    "description" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_supabaseId_key" ON "Player"("supabaseId");

-- CreateIndex
CREATE INDEX "location_idx" ON "Player" USING GIST ("coordinate");
