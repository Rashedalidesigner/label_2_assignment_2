
import { pool } from "../../db";
import type { Issue } from "./Issues.interface";

const createIssueInDB = async (issueData: Issue) => {
    console.log(issueData);
    const { title, description, type, status, reporter_id } = issueData;
    try {
        const result = await pool.query(
            "INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, type, reporter_id]
        );
        return result.rows[0];
    } catch (error: any) {
        console.error("Error creating issue in database:", error.message);
    }
};

const getAllIssuesFromDB = async () => {
    try {
        const result = await pool.query("SELECT issues.*,users.id AS reporter_id,users.name AS reporter_name,users.role AS reporter_role FROM issues INNER JOIN users ON users.id = issues.reporter_id");
        return result.rows;
    } catch (error: any) {
        console.error("Error fetching issues from database:", error.message);
    }
};

const getIssueByIdFromDB = async (id: number) => {
    try {
        const result = await pool.query("SELECT issues.*,users.id AS reporter_id,users.name AS reporter_name,users.role AS reporter_role FROM issues INNER JOIN users ON users.id = issues.reporter_id WHERE issues.id = $1", [id]);
        return result.rows[0];
    } catch (error: any) {
        console.error("Error fetching issue from database:", error.message);
    }
};

const updateIssueInDB = async (id: number, issueData: Issue) => {
    const { title, description, type, status, reporter_id } = issueData;
    console.log(title, description, type, status, reporter_id);
    try {
        const result = await pool.query(
            "UPDATE issues SET title = $1, description = $2, type = $3, status = $4, reporter_id = $5 WHERE id = $6 RETURNING *",
            [title, description, type, status, reporter_id, id]
        );
        return result.rows[0];
    } catch (error: any) {
        console.error("Error updating issue in database:", error.message);
    }
};

const deleteIssueFromDB = async (id: number) => {
    try {
        const result = await pool.query("DELETE FROM issues WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error: any) {
        console.error("Error deleting issue from database:", error.message);
    }
};


export const issuesService = {
    createIssueInDB,
    getAllIssuesFromDB,
    getIssueByIdFromDB,
    updateIssueInDB,
    deleteIssueFromDB
};