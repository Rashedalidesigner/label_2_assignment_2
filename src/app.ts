import express from "express";
import { IssuesRouter } from "./modules/issues/issues.route.js";
import { UsersRouter } from "./modules/users/users.route.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", UsersRouter);
app.use("/api", IssuesRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
