/*
  Warnings:

  - You are about to drop the column `activity_id` on the `Registration_activities` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `Registration_activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Registration_activities" DROP CONSTRAINT "Registration_activities_activity_id_fkey";

-- AlterTable
ALTER TABLE "Registration_activities" DROP COLUMN "activity_id",
ADD COLUMN     "activityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Registration_activities" ADD CONSTRAINT "Registration_activities_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
