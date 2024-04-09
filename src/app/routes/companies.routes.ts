import KoaJoiRouter, { Joi } from "@koa-better-modules/joi-router";
import { companyController } from "~app/controllers/company.controller";

const router = new KoaJoiRouter();

router.route({
  method: "post",
  handler: companyController.create,
  path: "/",
  validate: {
    body: {
      name: Joi.string().required(),
      currentBalance: Joi.number().required(),
      identifier: Joi.string().required(),
      userId: Joi.string().required(),
    },
    type: "json",
  },
});

router.route({
  method: "patch",
  path: "/",
  handler: companyController.associateToUser,
  validate: {
    body: {
      identifier: Joi.string().required(),
    },
    type: "json",
  },
});

router.route({
  method: "get",
  path: "/user",
  handler: companyController.getAllFromUser,
});

router.route({
  path: "/identifier/:identifier",
  method: "get",
  handler: companyController.findOne,
  validate: {
    params: {
      identifier: Joi.string().required(),
    },
  },
});

router.prefix("/companies");

export { router as companyRouter };
