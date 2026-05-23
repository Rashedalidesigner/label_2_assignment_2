import pg from "pg";
import config from "../config/config";

const { Pool } = pg;

export const pool = new Pool({

    connectionString: config.connection_String,
});

export const initilizeDB = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,

            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'contributor',


            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);


        await pool.query(`CREATE TABLE IF NOT EXISTS issues(
            id SERIAL PRIMARY KEY,

            title VARCHAR(255) NOT NULL,
            description TEXT CHECK (LENGTH(description) >= 20),
            type VARCHAR(50) NOT NULL DEFAULT 'bug',
            status VARCHAR(50) DEFAULT 'open',
            reporter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("Database initialized successfully.");
    } catch (error: any) {
        console.error("Error initializing database:", error.message);
    }
};
