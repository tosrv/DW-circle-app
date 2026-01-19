import express, { json } from "express";
import dotenv from "dotenv";
import path from "path";
import { allowCors } from "./middleawares/cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleawares/error";

import authRouter from "./features/auth/auth.controller"

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(allowCors);
app.use(json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "../public/images")));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api", authRouter)

// Global error handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is running"));
