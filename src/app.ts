import express from "express";
import { IssuesRouter } from "./modules/issues/issues.route";
// import { issusesRouter } from "./modules/issues/issues.controller";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/issues", IssuesRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
