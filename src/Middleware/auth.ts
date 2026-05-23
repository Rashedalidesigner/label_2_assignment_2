import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { usersServices } from "../modules/users/users.services.js";
import { sendResponse } from "../utility/sendResponse.js";

export interface AuthRequest extends Request {
    user?: any;
}

export const auth = async (req: AuthRequest,
    res: Response,
    next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Authorization header missing",
            });
        }
        const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET as string);
        if (!decodedToken || typeof decodedToken === "string" || !("email" in decodedToken)) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Invalid token",
            });
        }
        const userExitsindb = await usersServices.getUserById(decodedToken.email);
        if (!userExitsindb) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "User not found",
            });
        }
        req.user = decodedToken as JwtPayload;
        next();
    } catch (error: any) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
}