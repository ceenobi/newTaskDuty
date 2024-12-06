import express, { json } from "express";
import dotenv from "dotenv";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors"

import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";

dotenv.config(); // Load environment variables from.env file

const app = express();
app.use(cors())
app.use(json());

//create routes
app.get("/", (req, res) => {
  res.send("Hello express");
});

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

//error for no routes
app.use((req, res, next) => {
  next(createHttpError(400, "Endpoint not found"));
});

//general error and specific errors
app.use((error, req, res) => {
  console.log(error);
  let errorMessage = "An unknown error has occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
