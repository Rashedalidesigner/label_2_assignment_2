import type { Request, Response } from "express";
import { usersServices } from "./users.services";

const getUser = async (req: Request, res: Response) => {
    const users = await usersServices.getUser();
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users found",
        });
    }
    res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersServices.getUserById(Number(id));
    // console.log(user)
    if (user.length === 0) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    res.json({
        success: true,
        message: "User retrieved successfully",
        data: user
    });
};

const createUser = async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await usersServices.createUser(userData);
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

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await usersServices.updateUser(id as string, userData);
    // console.log(updatedUser);
    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    res.json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
    });
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    const deletedUser = await usersServices.deleteUser(Number(id));
    if (!deletedUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    res.json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser
    });
}

export const usersController = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById
}