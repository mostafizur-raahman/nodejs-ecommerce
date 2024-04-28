import express from "express";
import {
    createCategoryControllers,
    deleteCategoryControllers,
    getAllCategoryControllers,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/create", createCategoryControllers);
router.get("/all-category", getAllCategoryControllers);
router.delete("/delete-category", deleteCategoryControllers);

export default router;
