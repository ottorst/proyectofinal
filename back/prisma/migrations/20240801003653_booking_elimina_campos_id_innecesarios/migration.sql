/*
  Warnings:

  - You are about to drop the column `EventsId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "EventsId",
DROP COLUMN "UserId";
