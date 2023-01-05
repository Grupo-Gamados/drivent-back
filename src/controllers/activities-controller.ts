import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activitiesService from "@/services/activities-service";

export async function listEventDays(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const eventDays = await activitiesService.getListEventDays(Number(userId));

    return res.status(httpStatus.OK).send(eventDays);
  } catch (error) {
    if (error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "PaymentRequiredError") {
      return res.status(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function listActivitiesWithDayId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { dayId } = req.params;

  try {
    const hotels = await activitiesService.getActivitiesWithDayId(Number(userId), Number(dayId));

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function registerForActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;

  try {
    await activitiesService.registerForActivityById(Number(userId), Number(activityId));

    return res.status(httpStatus.CREATED).send({
      message: "Inscrição com sucesso",
    });
  } catch (error) {
    if (error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
