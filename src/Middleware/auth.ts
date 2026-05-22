import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { usersServices } from "../modules/users/users.services";

export const auth = (...role: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization header missing",
                });
            }
            const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET as string);
            if (!decodedToken || typeof decodedToken === "string" || !("email" in decodedToken)) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token",
                });
            }
            const userExitsindb = await usersServices.getUserById(decodedToken.email);
            if (!userExitsindb) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }
            if (!role.includes(decodedToken.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden Access",
                });
            }
            req.user = decodedToken as JwtPayload;
            next();
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error occurred while authenticating",
                error: error.message
            });
        }
    };
}