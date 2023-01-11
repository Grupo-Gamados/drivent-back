import { Request, Response } from "express";
import httpStatus from "http-status";
import oauthLoginService from "@/services/oauth-service";
import axios from "axios";

export async function signInUsingGithub(req: Request, res: Response) {
  try {
    const token = await getAccessToken(req.body.code);
    const user = await fetchUser(token);
    const result = await oauthLoginService.signInUsingGithub(user.email);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error });
  }
}

async function getAccessToken(code: string) {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/loign/oauth/access_token";
  
  const params = { 
    code,
    grant_type: "authorization_code",
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    redirect_uri: process.env.GITHUB_REDIRECT_URI
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      "Content_type": "application/json"
    }
  });

  const token = data.split("&")[0].split("=")[1];

  return token;
}

async function fetchUser(token: string) {
  const response = await axios.get("http://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
