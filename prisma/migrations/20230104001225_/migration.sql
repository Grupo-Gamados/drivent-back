-- CreateTable
CREATE TABLE "Registration_activities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registration_activities" ADD CONSTRAINT "Registration_activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration_activities" ADD CONSTRAINT "Registration_activities_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
