import Task from "../models/task.js";
import User from "../models/user.js";
import creatHttpError from "http-errors";

export const createTask = async (req, res, next) => {
  const { id: userId } = req.user;
  const { title, description, tags } = req.body;
  try {
    if (!title || !description) {
      return next(
        creatHttpError(400, "Tiltle and descrioption fields are required")
      );
    }
    const task = await Task.create({
      userId,
      title,
      description,
      tags,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ _id: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getUserTasks = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(creatHttpError(404, "User not found"));
    }
    const tasks = await Task.find({ userId: userId }).sort({ _id: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: taskId } = req.params;
  try {
    if (!taskId) {
      return next(creatHttpError(400, "Task id is missing"));
    }
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return next(creatHttpError(404, "Task not found"));
    }
    if (!task.userId.equals(userId)) {
      return next(creatHttpError(403, "Unauthorized to perform this request"));
    }
    res.status(200).send("Task deleted");
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: taskId } = req.params;
  const { title, description, tags } = req.body;
  try {
    if (!taskId) {
      return next(creatHttpError(400, "Task id is required"));
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return next(creatHttpError(404, "Task not found"));
    }
    if (!task.userId.equals(userId)) {
      return next(creatHttpError(403, "Unauthorized to perform this request"));
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.tags = tags || task.tags;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};
