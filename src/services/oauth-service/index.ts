import { notFoundError } from "@/errors";
import { getAccessToken } from "@/utils/githubAcessCode";
import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { SignInResult } from "../authentication-service";

async function signInUsingGithub(code: string): Promise<SignInResult> {
  const userEmail = await getAccessToken(code);

  if (!userEmail) {
    throw notFoundError;
  }

  let user = await getOAuthUser(userEmail);

  if (!user) {
    const { id, email } = await userRepository.create({ email: userEmail });

    user = { id, email };
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  await sessionRepository.create({ token, userId: user.id });

  return { token, user };
}

async function getOAuthUser(email: string): Promise<GetOAuthUserResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true });

  if (!user) throw notFoundError;

  return user;
}

const oauthLoginService = { signInUsingGithub };

export default oauthLoginService;

export type OauthCode = { code: string };

type GetOAuthUserResult = Pick<User, "id" | "email">;
