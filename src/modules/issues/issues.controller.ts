import type { Request as ExpressRequest, Response } from "express";
import { issuesService } from "./issues.services.js";
import type { IssueWithReporter } from "./Issues.interface.js";
import { sendResponse } from "../../utility/sendResponse.js";

const getissues = async (req: ExpressRequest, res: Response) => {
    try {
        const sort = req.query.sort as string || "newest";
        const type = req.query.type as string | undefined;
        const status = req.query.status as string | undefined;
        const result = await issuesService.getAllIssuesFromDB(sort, type, status);
        if (!result || result.length === 0) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "No issues found"
            });
        }
        const formattedData = result.map((issue) => ({

            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,

            reporter: {
                id: issue.reporter_id,
                name: issue.reporter_name,
                role: issue.reporter_role,
            },

            created_at: issue.created_at,
            updated_at: issue.updated_at,
        }));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: formattedData
        });
    } catch (error: any) {
        throw new Error("Error fetching issues", { cause: error.message });
    }
}

const getIssueById = async (req: ExpressRequest, res: Response) => {
    try {
        const result: IssueWithReporter = await issuesService.getIssueByIdFromDB(Number(req.params.id));
        if (!result) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue not found"
            });
        }
        const formattedData = {
            id: result.id,
            title: result.title,
            description: result.description,
            type: result.type,
            status: result.status,

            reporter: {
                id: result.reporter_id,
                name: result.reporter_name,
                role: result.reporter_role,
            },

            created_at: result.created_at,
            updated_at: result.updated_at,
        };
        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: formattedData
        });
    } catch (error: any) {
        throw new Error("Error fetching issue", { cause: error.message });
    }
}


const createIssue = async (req: ExpressRequest, res: Response) => {
    const issueData = req.body;
    const id = req.user.id;
    issueData.reporter_id = id;
    console.log(issueData);
    try {
        const result = await issuesService.createIssueInDB(issueData);
        if (!result) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Failed to create issue"
            });
        }

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result
        });
    } catch (error: any) {
        throw new Error("Error creating issue", { cause: error.message });
    }
}


const updateIssue = async (req: ExpressRequest, res: Response) => {
    const issueData = req.body;
    const id = req.user.id;
    issueData.status = issueData.status || 'in_progress';
    issueData.reporter_id = id;
    try {
        const result = await issuesService.updateIssueInDB(Number(req.params.id), issueData);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue updated successfully",
            data: result
        });
    } catch (error: any) {
        throw new Error("Error updating issue", { cause: error.message });
    }
}

const deleteIssue = async (req: ExpressRequest, res: Response) => {
    try {
        const result = await issuesService.deleteIssueFromDB(Number(req.params.id));
        if (!result) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue not found"
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully",
        });
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