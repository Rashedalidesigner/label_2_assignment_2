import { Router } from "express";
import { issusesController } from "./issues.controller.js";
import { auth } from "../../Middleware/auth.js";
import { authorize } from "../../Middleware/authrole.js";


const router = Router();

router.get("/issues", auth, issusesController.getissues);
router.post("/issues", auth, issusesController.createIssue);
router.patch("/issues/:id", auth, authorize, issusesController.updateIssue);
router.delete("/issues/:id", auth, authorize, issusesController.deleteIssue);
router.get("/issues/:id", auth, issusesController.getIssueById);

export const IssuesRouter = router;