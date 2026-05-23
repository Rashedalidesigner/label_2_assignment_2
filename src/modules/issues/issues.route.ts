import { Router } from "express";
import { issusesController } from "./issues.controller";
import { auth } from "../../Middleware/auth";
import { authorize } from "../../Middleware/authrole";


const router = Router();

router.get("/issues", auth, issusesController.getissues);
router.post("/issues", auth, issusesController.createIssue);
router.patch("/issues/:id", auth, authorize, issusesController.updateIssue);
router.delete("/issues/:id", auth, authorize, issusesController.deleteIssue);
router.get("/issues/:id", auth, issusesController.getIssueById);

export const IssuesRouter = router;