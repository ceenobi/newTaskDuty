import express, { json } from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from.env file

const app = express();
app.use(json());

//create routes
app.get("/", (req, res) => {
  res.send("Hello express");
});

export default app;
