// user router
import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router: Router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/email", userController.findUserByEmail);

export default router;
