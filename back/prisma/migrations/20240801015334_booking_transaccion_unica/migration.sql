/*
  Warnings:

  - A unique constraint covering the columns `[TransactionNumber]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_TransactionNumber_key" ON "Booking"("TransactionNumber");
