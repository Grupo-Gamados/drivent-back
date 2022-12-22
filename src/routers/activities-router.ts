import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listEventDays, listActivitiesWithDayId } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter.all("/*", authenticateToken).get("/days", listEventDays).get("/:dayId", listActivitiesWithDayId);

export { activitiesRouter };
