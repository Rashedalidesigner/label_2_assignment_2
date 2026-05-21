import type { Request, Response } from "express";
import { issuesService } from "./issues.services";

const getissues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.getAllIssuesFromDB();
        res.json(result);
    } catch (error: any) {
        throw new Error("Error fetching issues", { cause: error.message });
    }
}

const getIssueById = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.getIssueByIdFromDB(Number(req.params.id));
        res.json(result);
    } catch (error: any) {
        throw new Error("Error fetching issue", { cause: error.message });
    }
}


const createIssue = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.createIssueInDB(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        throw new Error("Error creating issue", { cause: error.message });
    }
}


const updateIssue = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.updateIssueInDB(Number(req.params.id), req.body);
        res.json(result);
    } catch (error: any) {
        throw new Error("Error updating issue", { cause: error.message });
    }
}

const deleteIssue = async (req: Request, res: Response) => {
    try {
        await issuesService.deleteIssueFromDB(Number(req.params.id));
        res.status(204).send();
    } catch (error: any) {
        throw new Error("Error deleting issue", { cause: error.message });
    }
}



export const issusesController = {
    getissues,
    createIssue,
    updateIssue,
    deleteIssue,
    getIssueById
}