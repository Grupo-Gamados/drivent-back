import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import jwt from "jsonwebtoken";
import { SignInResult } from "../authentication-service";

async function signInUsingGithub(login: string): Promise<SignInResult> {
  const githubEmail = login + "@github.com";
  const userExists = await userRepository.findByEmail(githubEmail);

  if (!userExists) {
    const password = Math.random().toString(36).slice(-8);
    await userRepository.create({ email: githubEmail, password });
  }

  const user = await userRepository.findByEmail(githubEmail);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  const otherToken = await sessionRepository.create({ token, userId: user.id });

  return { token, user };
}

const oauthLoginService = { signInUsingGithub };

export default oauthLoginService;
