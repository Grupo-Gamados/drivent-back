import { request } from "./request";

async function getAccessToken(code: string) {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/loign/oauth/access_token";
  const GITHUB_USER_URL = "https://api.github.com/user";
  
  const params = { 
    code,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    redirect_uri: process.env.GITHUB_REDIRECT_URI
  };

  const response = await request.post(GITHUB_ACCESS_TOKEN_URL, params);

  const parseData = new URLSearchParams(response.data);
  const token = parseData.get("access_token");

  const userResponse = await request.getUsingHeader(GITHUB_USER_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const userEmail = userResponse.data.email;

  return userEmail;
}

export { getAccessToken };
