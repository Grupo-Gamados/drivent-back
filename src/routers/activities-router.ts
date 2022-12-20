import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listEventDays } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter.all("/*", authenticateToken).get("/days", listEventDays);

export { activitiesRouter };
