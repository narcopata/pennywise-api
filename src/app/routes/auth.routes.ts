import Router from "@koa/router";
import { authController } from "../controllers/auth.controller";

const router = new Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

export { router as authRouter };
