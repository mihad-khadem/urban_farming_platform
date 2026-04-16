import { Router } from "express";
import prisma from "../config/db";
import sendResponse from "../utils/sendResponse";

const router: Router = Router();

// Example test route
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Test route is working!",
    data: users,
  });
});

export default router;
