/*
  Warnings:

  - You are about to drop the column `public` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "public",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "biography" JSONB,
ADD COLUMN     "publicProfile" BOOLEAN;

-- CreateTable
CREATE TABLE "MusicSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" JSONB,

    CONSTRAINT "MusicSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MusicSkillToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MusicSkill_name_key" ON "MusicSkill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicSkillToUser_AB_unique" ON "_MusicSkillToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicSkillToUser_B_index" ON "_MusicSkillToUser"("B");

-- AddForeignKey
ALTER TABLE "_MusicSkillToUser" ADD FOREIGN KEY ("A") REFERENCES "MusicSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicSkillToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
