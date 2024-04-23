import express from "express";
import rootController from "../controllers/RootController.js";

const router = express.Router();

router.get("/root", rootController);

export default router;
