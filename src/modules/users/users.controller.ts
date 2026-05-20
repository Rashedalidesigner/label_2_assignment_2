import type { Request, Response } from "express";

const getUser = (req: Request, res: Response) => {
    res.send("Users endpoint");
}

const getUserById = (req: Request, res: Response) => {
    res.send("Get user by ID endpoint");
}

const createUser = (req: Request, res: Response) => {
    res.send("Create user endpoint");
}

const updateUser = (req: Request, res: Response) => {
    res.send("Update user endpoint");
}

const deleteUser = (req: Request, res: Response) => {
    res.send("Delete user endpoint");
}

export const usersController = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById
}