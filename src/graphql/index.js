import { ApolloServer, gql } from "apollo-server-express";
import fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

import resolvers from "./resolvers";

const typeDefs = gql`
  ${fs.readFileSync(path.resolve(__dirname, "../../../schema.graphql"))}
`;

export async function gqlServer() {
  const db = new MongoClient(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost`,
    {
      useUnifiedTopology: true,
    }
  );
  const client = await db.connect();
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      const dbClient = client.db("test");
      const { headers } = ctx.req;

      let context = { db: dbClient };

      console.log(headers.authorization);
      if (headers.authorization) {
        try {
          const tokenInfo = jwt.verify(
            headers.authorization,
            process.env.JWT_KEY
          );
          context.user = await dbClient
            .collection("user")
            .findOne({ _id: ObjectId(tokenInfo.sub) });
        } catch (e) {
          console.log(e.message);
        }
      }
      return context;
    },
  });
}
