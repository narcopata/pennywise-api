import { authRouter } from "./auth.routes";
import { companyRouter } from "./companies.routes";
import { authAccessMiddleware } from "../../infra/middlewares/authAccess";
import { transactionRouter } from "./transactions.routes";
import KoaJoiRouter from "@koa-better-modules/joi-router";

const router = new KoaJoiRouter();

router.use(authRouter.middleware());
router.use(authAccessMiddleware, companyRouter.middleware());
router.use(authAccessMiddleware, transactionRouter.middleware());

export { router };
