import express, { Application, Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";

// import routes from "./routes";
import errorHandler from "./middlewares/error.middleware";
import sendResponse from "./utils/sendResponse";

dotenv.config();

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Welcome to the Urban Farming Platform API",
  });
});

// routes
// app.use("/api/v1", routes);

// global error handler
app.use(errorHandler);

export default app;
