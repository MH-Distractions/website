import discord from "discord.js";
import { MongoClient } from "mongodb";

const Discord = require("discord.js");
const client = new Discord.Client();

async function updateLocalCache() {
  const db = new MongoClient(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
    {
      useUnifiedTopology: true,
    }
  );
  const dbClient = await db.connect();

  const client = new discord.Client();
  await client.login(process.env.DISCORD_TOKEN);
  const guild = await client.guilds.cache.get(process.env.DISCORD_GUILD);
  const members = await guild.members
    .fetch({
      withPresences: true,
    })
    .then((d) =>
      d.filter((user) => {
        return user.presence.status !== "offline";
      })
    );

  let a = members.array();
  for (let m of a) {
    const u = await client.users.fetch(m.id);

    await dbClient
      .db(process.env.DB_NAME)
      .collection("discord")
      .updateOne(
        { id: m.id },
        {
          $set: {
            id: m.id,
            name: m.displayName,
            playing: m.presence.activities[0]
              ? m.presence.activities[0].state || m.presence.activities[0].name
              : null,
            status: m.presence.status.toUpperCase(),
            avatar_url: u.avatarURL({ size: 16 }) || "",
            avatar_url_jpg: u.avatarURL({ size: 16, format: "jpg" }) || "",
          },
        },
        { upsert: true }
      );
  }
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(async () => await updateLocalCache(), 60000);
  await updateLocalCache();
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.login(process.env.DISCORD_TOKEN);
