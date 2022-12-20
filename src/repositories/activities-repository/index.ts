import { prisma } from "@/config";

async function getListEventDays() {
  return prisma.days.findMany({
    select: {
      name: true,
    },
  });
}

const activitiesRepository = {
  getListEventDays,
};

export default activitiesRepository;
