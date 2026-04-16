// index routes
import { Router } from "express";
import userRoutes from "./user.routes";
const router: Router = Router();

router.use("/users", userRoutes);
// more routes can be added here
export default router;
