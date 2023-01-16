import { Router } from "express";
import { signInUsingGithub } from "@/controllers/oauth-controller";

const oauthRouter = Router();

oauthRouter.post("/github/login", signInUsingGithub);

export { oauthRouter };
