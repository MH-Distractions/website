import axios from "axios";
import { AuthenticationError } from "apollo-server-express";

export default async (_, args, ctx) => {
  try {
    const data = {
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: "http%3A%2F%2F172.25.186.233%3A3000%2Flogin",
      scope: "guilds.join%20identify%20email",
      code: args.code,
    };

    let queryString = Object.keys(data)
      .map((k) => `${k}=${data[k]}`)
      .join("&");

    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      queryString,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );

    // Get user information from Discord
    const user = await axios.get("https://discord.com/api/v6/users/@me", {
      headers: { Authorization: `Bearer ${response.data.access_token}` },
    });

    // Get the users information from the DB
    let userDetails = await ctx.db
      .collection("user")
      .findOne({ discord_id: user.data.id });

    // If we do not have the user in the DB, create the user
    if (!userDetails) {
      userDetails = {
        discord_id: user.data.id,
        email: user.data.email,
        username: user.data.username,
        discriminator: user.data.discriminator,
        admin: false,
      };

      // Insert the user to the database
      userDetails._id = (
        await ctx.db.collection("user").insertOne(userDetails)
      ).insertedId;

      // Attempt to join the user to the guild
      await axios.put(
        `https://discord.com/api/v6/guilds/${process.env.DISCORD_GUILD}/members/${user.data.id}`,
        {
          access_token: response.data.access_token,
        },
        { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` } }
      );
    }

    // Store the user data against the token
    await ctx.cache.client.set(
      response.data.access_token,
      JSON.stringify({ tokens: response.data, user: userDetails }),
      "EX",
      response.data.expires_in
    );

    // Return the user and access token
    return { token: response.data.access_token, user: userDetails };
  } catch (e) {
    console.log(e);
    throw new AuthenticationError("Invalid login details");
  }
};
