import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { usersServices } from "./users.services";
import config from "../../config/config";

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await usersServices.getUserById(email);
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const genaratedToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwt_secret, {
            expiresIn: "1d"
        });

        res.json({
            success: true,
            message: "User retrieved successfully",
            data: user,
            token: genaratedToken
        });
    } catch (error: any) {
        res.status(500).json({
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
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const newUser = await usersServices.createUser(req.body);

        if (!newUser) {
            return res.status(500).json({
                success: false,
                message: "Failed to create user",
            });
        }
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error: any) {
        res.status(500).json({
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