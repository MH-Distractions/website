import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { gqlServer } from "./graphql";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const server = polka(); // You can also use Express
gqlServer().then((gqlServer) => {
  gqlServer.applyMiddleware({
    app: server,
    path: "/graphql",
  });

  server.use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  );
  server.listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
});

import "./discord";
