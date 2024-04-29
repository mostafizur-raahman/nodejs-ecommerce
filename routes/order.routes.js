import express from "express";
import { createOrderControllers } from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/create-order", createOrderControllers);

export default router;
