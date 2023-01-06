import { Request, Response } from "express";
import httpStatus from "http-status";
import oauthLoginService, { OauthCode } from "@/services/oauth-service";

export async function signInUsingGithub(req: Request, res: Response) {
  const { code } = req.body as OauthCode;

  try {
    const result = await oauthLoginService.signInUsingGithub(code);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error });
  }
}
