/*
  Warnings:

  - The `rol` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "rol",
ADD COLUMN     "rol" "Role" NOT NULL DEFAULT 'USER';
