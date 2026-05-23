import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { usersServices } from "./users.services";
import config from "../../config/config";
import { sendResponse } from "../../utility/sendResponse";

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await usersServices.getUserById(email);
        if (!user) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Invalid password",
            });
        }

        const genaratedToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwt_secret, {
            expiresIn: "1d"
        });

        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User retrieved successfully",
            data: {
                token: genaratedToken,
                user: userWithoutPassword
            },

        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error logging in",
            error: error.message
        });
    }

};

const createUser = async (req: Request, res: Response) => {

    try {
        const userExist = await usersServices.getUserById(req.body.email);
        if (userExist) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "User already exists",
            });
        }

        let password = req.body.password;
        if (!password || password.length < 6) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }
        const data = req.body;
        password = await bcrypt.hash(password, 10);
        data.password = password;
        const newUser = await usersServices.createUser({ ...req.body, password });

        if (!newUser) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Failed to create user"
            });
        }
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error creating user",
            error: error.message
        });
    }

};




export const usersController = {
    createUser,
    login
}