// middlewares/authorize.ts

import type { NextFunction, Response } from "express";
import type { AuthRequest } from "./auth.js";
import { pool } from "../db/index.js";

export const authorize = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.user.id;

        const result = await pool.query(
            "SELECT * FROM issues WHERE id = $1",
            [id]
        );

        const issue = result.rows[0];

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
            });
        }

        // maintainer can do anything
        if (req.user.role === "maintainer") {
            return next();
        }

        // contributor can modify only own issue
        if (req.user.role === "contributor") {
            // check ownership
            if (issue.reporter_id !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "You can modify only your own issue",
                });
            }

            // contributor can modify only open issues
            if (issue.status !== "open") {
                return res.status(403).json({
                    success: false,
                    message:
                        "You can modify issue only when status is open",
                });
            }

            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Forbidden access",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Authorization failed",
        });
    }
};