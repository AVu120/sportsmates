/*
  Warnings:

  - You are about to drop the column `end_datetime` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `max_number_of_attendees` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `start_datetime` on the `Session` table. All the data in the column will be lost.
  - Added the required column `endDatetime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxNumberOfAttendees` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDatetime` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "end_datetime",
DROP COLUMN "max_number_of_attendees",
DROP COLUMN "start_datetime",
ADD COLUMN     "endDatetime" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "maxNumberOfAttendees" INTEGER NOT NULL,
ADD COLUMN     "startDatetime" TIMESTAMPTZ(3) NOT NULL;
