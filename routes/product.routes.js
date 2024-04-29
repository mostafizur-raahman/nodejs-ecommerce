import express from "express";
import {
    createProductControllers,
    deleteProductControllers,
    getAllProductsControllers,
    getSingleProducControllers,
    sortProductsControllers,
    updateProductControllers,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/all-products", getAllProductsControllers);
router.get("/single-product", getSingleProducControllers);
router.post("/create-product", createProductControllers);
router.patch("/update-product", updateProductControllers);
router.delete("/delete-product", deleteProductControllers);
// sort products
router.get("/sort-products", sortProductsControllers);
export default router;
