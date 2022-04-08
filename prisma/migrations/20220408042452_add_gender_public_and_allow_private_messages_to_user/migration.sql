-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowPrivateMessages" BOOLEAN,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "public" BOOLEAN;
