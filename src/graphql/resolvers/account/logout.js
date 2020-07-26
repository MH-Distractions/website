import axios from "axios";

export default async (_, args, ctx) => {
  if (!ctx.user) {
    return false;
  }
  const data = {
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    token: ctx.user.tokens.refresh_token,
  };
  let queryString = Object.keys(data)
    .map((k) => `${k}=${data[k]}`)
    .join("&");

  ctx.cache.client.del(ctx.user.tokens.access_token);

  const response = await axios.post(
    "https://discord.com/api/oauth2/token/revoke",
    queryString,
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${ctx.user.tokens.access_token}`,
      },
    }
  );

  return true;
};
