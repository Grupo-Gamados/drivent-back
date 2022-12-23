import { prisma } from "@/config";

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
      totalVagas: true,
      dayId: true,
      localId: true,
    },
    where: {
      dayId: dayId,
    },
  });
}

const activitiesRepository = {
  getListEventDays,
  getActivitiesWithDayId,
};

export default activitiesRepository;
