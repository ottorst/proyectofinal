/*
  Warnings:

  - You are about to drop the column `document` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "document";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "auth0Id" DROP NOT NULL;
