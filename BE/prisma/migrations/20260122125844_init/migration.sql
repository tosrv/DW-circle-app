/*
  Warnings:

  - You are about to drop the column `image` on the `Replies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Replies" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
