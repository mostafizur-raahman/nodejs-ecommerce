import express from "express";
import {
    createOrderControllers,
    getOrdersControllers,
} from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/create-order", createOrderControllers);
// get the order
router.get("/all-orders", getOrdersControllers);

export default router;
