import { ApolloServer, AuthenticationError, gql } from "apollo-server-express";
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

import resolvers from "./resolvers";
import { CacheClient } from "./CacheClient";
import Axios from "axios";

const typeDefs = gql`
  ${fs.readFileSync(path.resolve(__dirname, "../../../schema.graphql"))}
`;

export async function gqlServer() {
  const db = new MongoClient(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
    {
      useUnifiedTopology: true,
    }
  );
  const client = await db.connect();
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      const dbClient = client.db(process.env.DB_NAME);
      const { headers } = ctx.req;

      let context = { db: dbClient, cache: new CacheClient() };

      if (headers.authorization) {
        try {
          context.user = JSON.parse(
            await context.cache.get(headers.authorization)
          );
        } catch (e) {
          console.log(e);
          throw new AuthenticationError("Invalid token provided");
        }
      }
      return context;
    },
  });
}
