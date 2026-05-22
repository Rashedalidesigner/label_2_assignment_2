import { Router } from "express";
import { issusesController } from "./issues.controller";
import { auth } from "../../Middleware/auth";


const router = Router();

// Define routes for issues here
router.get("/issues", issusesController.getissues);
router.post("/issues", auth("contributor", "maintainer"), issusesController.createIssue);
router.patch("/issues/:id", auth("maintainer", "contributor"), issusesController.updateIssue);
router.delete("/issues/:id", auth("maintainer"), issusesController.deleteIssue);
router.get("/issues/:id", issusesController.getIssueById);

export const IssuesRouter = router;