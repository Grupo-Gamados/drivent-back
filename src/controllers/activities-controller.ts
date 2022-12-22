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
    if (error.name === "paymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === "notFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
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
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListHotelsError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
