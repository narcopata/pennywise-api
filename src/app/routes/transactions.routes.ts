import KoaJoiRouter, { Joi } from "@koa-better-modules/joi-router";
import { transactionController } from "~app/controllers/transaction.controller";
import { TransactionTypeEnum } from "../../database/entities/transactions.entity";

const router = new KoaJoiRouter();

router.route({
  method: "post",
  path: "/",
  handler: transactionController.create,
  validate: {
    body: {
      type: Joi.valid(...Object.values(TransactionTypeEnum)).required(),
      description: Joi.string().optional().allow(null),
      amount: Joi.number().required(),
      date: Joi.date().required(),
      companyId: Joi.string().required(),
    },
    type: "json",
  },
});

router.route({
  method: "patch",
  path: "/",
  handler: transactionController.update,
  validate: {
    type: "json",
    body: Joi.object(),
  },
});

router.route({
  method: "delete",
  path: "/:transactionId",
  handler: transactionController.delete,
  validate: {
    params: {
      transactionId: Joi.string().required(),
    },
  },
});

router.route({
  method: "get",
  path: "/:companyId",
  handler: transactionController.getAllFromCompany,
  validate: {
    params: {
      companyId: Joi.string().required(),
    },
    type: "json",
  },
});

router.prefix("/transactions");

export { router as transactionRouter };
