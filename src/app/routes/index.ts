import Router from "@koa/router";
import { authRouter } from "./auth.routes";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

export { router };
