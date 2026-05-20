import type { Request, Response } from "express";

const getissues = (req: Request, res: Response) => {
    res.send("Issues endpoint");
}

const getIssueById = (req: Request, res: Response) => {
    res.send("Get issue by ID endpoint");
}


const createIssue = (req: Request, res: Response) => {
    res.send("Create issue endpoint");
}

const updateIssue = (req: Request, res: Response) => {
    res.send("Update issue endpoint");
}

const deleteIssue = (req: Request, res: Response) => {
    res.send("Delete issue endpoint");
}



export const issusesController = {
    getissues,
    createIssue,
    updateIssue,
    deleteIssue,
    getIssueById
}