import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

// Define routes for users here
router.post("/auth/sign-up", usersController.createUser);
router.post("/auth/login", usersController.login);

export const UsersRouter = router;