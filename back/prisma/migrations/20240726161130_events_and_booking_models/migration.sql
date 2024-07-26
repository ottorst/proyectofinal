-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "maxseats" INTEGER NOT NULL DEFAULT 8,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "EventsId" INTEGER NOT NULL,
    "TransactionNumber" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Paid" DOUBLE PRECISION NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
