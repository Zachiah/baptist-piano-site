/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BlogPost_slug_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
