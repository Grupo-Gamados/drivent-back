import { Router } from "express";
import { signInUsingGithub } from "@/controllers/oauth-controller";
import { validateBody } from "@/middlewares";
import { oauthSchema } from "@/schemas";

const oauthRouter = Router();

oauthRouter.post("/github/login", validateBody(oauthSchema), signInUsingGithub);

export { oauthRouter };
