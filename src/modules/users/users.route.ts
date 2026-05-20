import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

// Define routes for users here
router.get("/users", usersController.getUser);
router.post("/users", usersController.createUser);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);
router.get("/users/:id", usersController.getUserById);

export const UsersRouter = router;