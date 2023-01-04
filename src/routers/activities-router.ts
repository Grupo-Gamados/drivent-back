import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listEventDays, listActivitiesWithDayId, registerForActivity } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", listEventDays)
  .get("/:dayId", listActivitiesWithDayId)
  .post("/", registerForActivity);

export { activitiesRouter };
