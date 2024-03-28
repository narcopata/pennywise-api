import Router from "@koa/router";
import { authRouter } from "./auth.routes";
import { companyRouter } from "./companies.routes";
import { authAccessMiddleware } from "../../infra/middlewares/authAccess";
import { transactionRouter } from "./transactions.routes";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use(
  "/companies",
  authAccessMiddleware,
  companyRouter.routes(),
  companyRouter.allowedMethods(),
);
router.use(
  "/transactions",
  authAccessMiddleware,
  transactionRouter.routes(),
  transactionRouter.allowedMethods(),
)

export { router };
