import express from "express";
import {
    getUserController,
    loginController,
    registerController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", getUserController);
router.patch("/update-profile");
export default router;
