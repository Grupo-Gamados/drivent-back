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
  const userActivities = await activitiesRepository.getUserActivitiesRegistered(userId);

  const newListDayActivities = dayActivities.map((act) => {
    let newObjectAct = { ...act, isRegistered: false };

    for (let i = 0; i < userActivities.length; i++) {
      if (act.id === userActivities[i].activityId) {
        newObjectAct = { ...act, isRegistered: true };
      }
    }

    return newObjectAct;
  });

  return newListDayActivities;
}

async function registerForActivityById(userId: number, activityId: number) {
  await checkUserAcess(userId);

  const { vacancies, startTime, endTime, dayId } = await activitiesRepository.getActivityById(activityId);
  const startTimeNumber = convertHourForNumber(startTime);
  const endTimeNumber = convertHourForNumber(endTime);

  if (vacancies === 0) {
    throw conflictError("Não há vagas");
  }

  const userActivities = await activitiesRepository.getUserActivities(userId);
  const userActivitiesDay = userActivities.filter((act) => act.Activities.dayId === dayId);

  for (let i = 0; i < userActivitiesDay.length; i++) {
    const startTimeAct = convertHourForNumber(userActivitiesDay[i].Activities.startTime);
    const endTimeAct = convertHourForNumber(userActivitiesDay[i].Activities.endTime);

    if (
      (startTimeAct <= startTimeNumber && startTimeNumber < endTimeAct) ||
      (startTimeAct < endTimeNumber && endTimeNumber <= endTimeAct)
    ) {
      throw conflictError("Você já se inscreveu em uma  atividade neste horário");
    }
  }

  const vacanciesAtt = Number(vacancies) - 1;

  await activitiesRepository.registerForActivity(activityId, userId, vacanciesAtt);

  await activitiesRepository.updateVacancies(activityId, Number(vacanciesAtt));

  return;
}

function convertHourForNumber(hour: string) {
  const hourNumber = Number(hour.substring(0, 2));
  const minutesNumber = Number(hour.substring(3, 5));

  const convertMinutesForFloat = (10 * minutesNumber) / 60 / 10;

  const hourForUse = hourNumber + convertMinutesForFloat;

  return hourForUse;
}

const activitiesService = {
  getListEventDays,
  getActivitiesWithDayId,
  registerForActivityById,
};

export default activitiesService;
