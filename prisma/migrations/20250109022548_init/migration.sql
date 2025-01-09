/*
  Warnings:

  - Changed the type of `rol` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "rol",
ADD COLUMN     "rol" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Rol";
