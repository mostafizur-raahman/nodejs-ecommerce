import express from "express";
import {
    getUserController,
    loginController,
    registerController,
    updateUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", getUserController);
router.patch("/update-profile", updateUserController);

export default router;
