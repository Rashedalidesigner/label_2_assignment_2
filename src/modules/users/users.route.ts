import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

// Define routes for users here
router.get("/", usersController.getUser);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);
router.get("/:id", usersController.getUserById);