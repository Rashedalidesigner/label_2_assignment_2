import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { usersServices } from "./users.services";

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await usersServices.getUserById(email);
    // console.log(user)
    if (user.length === 0) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const isPasswordValid = user[0].password === password;
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
        });
    }

    const genaratedToken = jwt.sign({ id: user[0].id, email: user[0].email, role: user[0].role }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "1h"
    });

    res.json({
        success: true,
        message: "User retrieved successfully",
        data: user,
        token: genaratedToken
    });
};

const createUser = async (req: Request, res: Response) => {
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
};




export const usersController = {
    createUser,
    login
}