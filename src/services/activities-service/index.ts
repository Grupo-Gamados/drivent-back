import { forbiddenError, paymentRequiredError, conflictError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import tikectRepository from "@/repositories/ticket-repository";

async function checkUserAcess(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw paymentRequiredError();
  }
  const ticket = await tikectRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED") {
    throw paymentRequiredError();
  }

  if (ticket.TicketType.isRemote) {
    throw forbiddenError();
  }
}

async function getListEventDays(userId: number) {
  await checkUserAcess(userId);

  const eventDays = await activitiesRepository.getListEventDays();

  return eventDays;
}

async function getActivitiesWithDayId(userId: number, dayId: number) {
  await checkUserAcess(userId);

  const dayActivities = await activitiesRepository.getActivitiesWithDayId(dayId);

  return dayActivities;
}

async function registerForActivityById(userId: number, activityId: number) {
  await checkUserAcess(userId);

  const { vacancies } = await activitiesRepository.getActivityById(activityId);

  if (vacancies === 0) {
    throw conflictError("Não há vagas");
  }

  await activitiesRepository.registerForActivity({ activityId, userId });

  const vacanciesAtt = Number(vacancies) - 1;

  await activitiesRepository.updateVacancies(activityId, Number(vacanciesAtt));

  return;
}

const activitiesService = {
  getListEventDays,
  getActivitiesWithDayId,
  registerForActivityById,
};

export default activitiesService;
