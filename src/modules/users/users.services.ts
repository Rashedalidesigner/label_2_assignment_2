import { pool } from "../../db";
import type { IUser } from "./users.interface";


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

export const usersServices = {
    getUserById,
    createUser,
};