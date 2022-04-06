/*
  Warnings:

  - You are about to drop the column `experation` on the `Token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "experation",
ADD COLUMN     "expiration" TIMESTAMP(3);
