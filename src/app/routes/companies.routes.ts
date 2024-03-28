import Router from "@koa/router";
import { companyController } from "~app/controllers/company.controller";

const router = new Router();

router.post("/", companyController.create);
router.patch("/", companyController.associateToUser);
router.get("/user/:p", companyController.getAllFromUser)
router.get("/:identifier", companyController.findOne);

export { router as companyRouter };
