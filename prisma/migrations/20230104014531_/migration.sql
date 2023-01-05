/*
  Warnings:

  - You are about to drop the column `vacancies` on the `Activities` table. All the data in the column will be lost.
  - Added the required column `vacancies` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "vacancies",
ADD COLUMN     "vacancies" INTEGER NOT NULL;
