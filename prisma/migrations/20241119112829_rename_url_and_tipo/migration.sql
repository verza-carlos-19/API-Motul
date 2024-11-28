/*
  Warnings:

  - You are about to drop the column `tipo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tipo",
DROP COLUMN "url",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'categoria',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'image-url';
