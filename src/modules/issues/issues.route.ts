import { Router } from "express";
import { issusesController } from "./issues.controller";


const router = Router();

// Define routes for issues here
router.get("/issues", issusesController.getissues);
router.post("/issues", issusesController.createIssue);
router.put("/issues/:id", issusesController.updateIssue);
router.delete("/issues/:id", issusesController.deleteIssue);
router.get("/issues/:id", issusesController.getIssueById);

export const IssuesRouter = router;