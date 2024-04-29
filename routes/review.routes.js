import express from "express";
import { createReviewControllers } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/create", createReviewControllers);
// get the order
// router.get("/all-orders", getOrdersControllers);

export default router;
