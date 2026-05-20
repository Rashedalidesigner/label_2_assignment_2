import { pool } from "../../db";
import type { IUser } from "./users.interface";

const getUser = async () => {
    // Implementation for getting all users
    const data = await pool.query("SELECT * FROM users");
    return data.rows;
};

const getUserById = async (id: number) => {
    // Implementation for getting user by ID
    const data = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log(data);
    return data.rows;
};

const createUser = async (userData: IUser) => {
    const { name, email, role, password } = userData;
    // Implementation for creating a new user
    const data = await pool.query("INSERT INTO users (name, email,role,password) VALUES ($1, $2, $3, $4) RETURNING id, name,email,role,created_at,updated_at", [name, email, role, password]);
    return data.rows[0];
};

const updateUser = async (id: string, userData: IUser) => {
    const { name, email, role, password } = userData;
    // Implementation for updating a user
    const data = await pool.query("UPDATE users SET name = $1, email = $2, role = $3, password = $4 WHERE id = $5 RETURNING id, name,email,role,created_at,updated_at", [name, email, role, password, id]);
    return data.rows[0];
};

const deleteUser = async (id: number) => {
    const data = await pool.query("DELETE FROM users WHERE id = $1 ", [id]);
    return data.rows;
};

export const usersServices = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};