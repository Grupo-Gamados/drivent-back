import { prisma } from "@/config";

async function getListEventDays() {
  return prisma.activities.findMany({});
}

const activitiesRepository = {
  getListEventDays,
};

export default activitiesRepository;
