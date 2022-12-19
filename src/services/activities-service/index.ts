import { forbiddenError, paymentRequiredError } from "@/errors";
/* import activitiesRepository from "@/repositories/activities-repository"; */
import enrollmentRepository from "@/repositories/enrollment-repository";
import tikectRepository from "@/repositories/ticket-repository";

async function checkUserAcess(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
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

  /* return activitiesRepository.create({ roomId, userId }); */
}

const activitiesService = {
  getListEventDays,
};

export default activitiesService;
