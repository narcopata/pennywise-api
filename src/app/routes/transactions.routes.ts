import Router from "@koa/router";
import { transactionController } from "~app/controllers/transaction.controller";

const router = new Router();

router.post("/", transactionController.create)
router.patch("/", transactionController.update)
router.delete("/:transactionId", transactionController.delete)
router.get("/:companyId", transactionController.getAllFromCompany)

export { router as transactionRouter };
