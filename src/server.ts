import "dotenv/config";
import "reflect-metadata";

import Koa from "koa";
import koaBody from "koa-body";

import cors from "@koa/cors";
import { router } from "./app/routes";

const server = new Koa();

const PORT = process.env.APP_PORT || 3333;

server.use(
  cors({
    origin: "*",
  }),
);

server.use(koaBody());

server.use(router.routes()).use(router.allowedMethods());

server.listen(PORT, () => {
  console.log("Server running on port " + "\x1b[36m" + PORT + "\x1b[0m");
});
