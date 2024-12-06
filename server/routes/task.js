import express from "express";
import {
  createTask,
  getAllTasks,
  getUserTasks,
  deleteTask,
  updateTask,
} from "../controllers/task.js";
import verifyToken from "../middlewares/verifyAuth.js";

const router = express.Router();

router.post("/create-task", verifyToken, createTask);
router.get("/get", verifyToken, getAllTasks);
router.get("/get-user", verifyToken, getUserTasks);

router.delete("/:id", verifyToken, deleteTask);

router.patch("/:id", verifyToken, updateTask);

export default router;
