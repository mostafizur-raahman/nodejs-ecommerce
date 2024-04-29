import express from "express";
import {
    createCategoryControllers,
    deleteCategoryControllers,
    getAllCategoryControllers,
    updateCategoryControllers,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/create", createCategoryControllers);
router.get("/all-category", getAllCategoryControllers);
router.delete("/delete-category", deleteCategoryControllers);
router.patch("/update-category", updateCategoryControllers);

export default router;
