import { Router } from "express";
import { issusesController } from "./issues.controller";


const router = Router();

// Define routes for issues here
router.get("/", issusesController.getissues);
router.post("/", issusesController.createIssue);
router.put("/:id", issusesController.updateIssue);
router.delete("/:id", issusesController.deleteIssue);
router.get("/:id", issusesController.getIssueById);

export const IssuesRouter = router;