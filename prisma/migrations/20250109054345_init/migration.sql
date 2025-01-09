/*
  Warnings:

  - You are about to drop the column `num_questions` on the `Ambits` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions_amount` on the `Perspectives` table. All the data in the column will be lost.
  - Added the required column `questions_amount` to the `Perspectives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ambits" DROP COLUMN "num_questions",
ADD COLUMN     "questions_amount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Perspectives" DROP COLUMN "dimensions_amount",
ADD COLUMN     "questions_amount" INTEGER NOT NULL;
