import teams from "./teams";
import news from "./news";
import discord from "./discord";
import account from "./account";

export default {
  Query: {
    teams: teams.list,
    news: news.list,
    article: news.entry,
    discord: discord.list,
  },
  Mutation: {
    login: account.login,
    register: account.register,
  },
};
