/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Net` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coordinates]` on the table `Net` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Net` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Net_name_key" ON "Net"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Net_coordinates_key" ON "Net"("coordinates");

-- CreateIndex
CREATE UNIQUE INDEX "Net_address_key" ON "Net"("address");
