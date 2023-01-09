-- DropIndex
DROP INDEX "Activities_id_idx";

-- CreateIndex
CREATE INDEX "Activities_dayId_idx" ON "Activities"("dayId");
