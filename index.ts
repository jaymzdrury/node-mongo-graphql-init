import config from "./config/config";
config;

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import connectDB from "./config/db";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import { cookieSet } from "./utils/cookie";
import authChecker from "./utils/authChecker";
import logger from "./utils/logger";
import { Context } from "./types/types";
import { NotFoundError } from "./errors";

const port = process.env.PORT || 4000;

async function init() {
  const app = express();

  const options = { origin: process.env.ORIGIN };
  app.use(cors(options));
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === "production" ? { useDefaults: true } : false,
    })
  );
  app.use(mongoSanitize());
  app.use(cookieParser());

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      authChecker,
    }),
    context: (ctx: Context) => cookieSet(ctx),
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await apollo.start();
  apollo.applyMiddleware({ app });

  app.get("/healthcheck", (req, res) => res.sendStatus(200));
  app.all("*", async (req, res) => {
    throw new NotFoundError("App not found");
  });

  const server = app.listen(port, () =>
    console.log(`server started on ${port}${apollo.graphqlPath}`)
  );
  connectDB();

  process.on("unhandledRejection", (err) => {
    logger.error(`Error: ${err}`);
    server.close(() => process.exit(1));
  });
}
init();
