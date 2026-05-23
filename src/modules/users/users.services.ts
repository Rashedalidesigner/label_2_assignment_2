import { pool } from "../../db/index.js";
import type { IUser } from "./users.interface.js";


const getUserById = async (email: string) => {
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return data.rows[0];
};

const createUser = async (userData: IUser) => {
    const { name, email, role, password } = userData;
    // Implementation for creating a new user
    const data = await pool.query("INSERT INTO users (name, email,role,password) VALUES ($1, $2, $3, $4) RETURNING id, name,email,role,created_at,updated_at", [name, email, role, password]);
    delete data.rows[0].password;
    return data.rows[0];
};

export const usersServices = {
    getUserById,
    createUser,
};