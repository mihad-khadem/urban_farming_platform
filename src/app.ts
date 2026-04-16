import express, { Application, Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";

// import routes from "./routes";
import routes from "./routes/index";
import testRoutes from "./routes/test.route";

// import middlewares / utils
import errorHandler from "./middlewares/error.middleware";
import sendResponse from "./utils/sendResponse";

dotenv.config();

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// health check
app.get("/", (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Welcome to the Urban Farming Platform API",
  });
});

// routes
app.use("/api/v1", routes);
// test route
app.use("/test", testRoutes);

// global error handler
app.use(errorHandler);

export default app;
