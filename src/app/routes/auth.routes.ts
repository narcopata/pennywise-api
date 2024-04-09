import { authController } from "../controllers/auth.controller";
import KoaJoiRouter, { Joi } from "@koa-better-modules/joi-router";

const router = new KoaJoiRouter();

router.route({
  method: "post",
  path: "/signup",
  handler: authController.signup,
  validate: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
    type: "json",
  },
});

router.route({
  method: "post",
  path: "/signin",
  handler: authController.signin,
  validate: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
    type: "json",
  },
});

router.prefix("/auth");

export { router as authRouter };
