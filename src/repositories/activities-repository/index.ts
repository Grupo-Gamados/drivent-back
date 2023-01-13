import { prisma } from "@/config";
import { Registration_activities } from "@prisma/client";

async function getListEventDays() {
  return prisma.days.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

async function getActivitiesWithDayId(dayId: number) {
  return prisma.activities.findMany({
    select: {
      id: true,
      name: true,
      startTime: true,
      endTime: true,
      duration: true,
      vacancies: true,
      dayId: true,
      localId: true,
    },
    where: {
      dayId: dayId,
    },
  });
}

async function registerForActivity(activityId: number, userId: number, vacanciesAtt: number): Promise<void> {
  return await prisma.$transaction(async (prisma) => {
    await prisma.registration_activities.create({
      data: {
        userId,
        activityId,
      },
    });
    await updateVacancies(activityId, vacanciesAtt);
  });
}

async function getActivityById(activityId: number) {
  return prisma.activities.findFirst({
    where: {
      id: activityId,
    },
    select: {
      vacancies: true,
      startTime: true,
      endTime: true,
      dayId: true,
    },
  });
}

async function updateVacancies(activityId: number, vacanciesAtt: number) {
  return prisma.activities.update({
    where: {
      id: activityId,
    },
    data: {
      vacancies: vacanciesAtt,
    },
  });
}

async function getUserActivities(userId: number) {
  return prisma.registration_activities.findMany({
    include: {
      Activities: true,
    },
    where: {
      userId: userId,
    },
  });
}

async function getUserActivitiesRegistered(userId: number) {
  return prisma.registration_activities.findMany({
    select: {
      activityId: true,
    },
    where: {
      userId: userId,
    },
  });
}

export type RegisterParams = Omit<Registration_activities, "id" | "createdAt" | "updatedAt">;

const activitiesRepository = {
  getListEventDays,
  getActivitiesWithDayId,
  registerForActivity,
  updateVacancies,
  getActivityById,
  getUserActivities,
  getUserActivitiesRegistered,
};

export default activitiesRepository;
