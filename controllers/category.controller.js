import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import Category from "../models/category.model.js";

export const createCategoryControllers = async (req, res) => {
    try {
        const { category } = req.body;
        console.log(category);
        if (!category) {
            return errorResponse(res, {
                statusCode: 500,
                message: "category field is required",
            });
        }
        const _doc = await Category.create({ category });

        return successResponse(res, {
            statusCode: 200,
            message: "category created successfully",
            payload: _doc,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to delete product, try again later",
        });
    }
};

export const getAllCategoryControllers = async (req, res) => {
    try {
        const allCategory = await Category.find({});

        return successResponse(res, {
            statusCode: 200,
            message: "category fetched successfully",
            payload: allCategory,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to delete product, try again later",
        });
    }
};

export const deleteCategoryControllers = async (req, res) => {
    try {
        const categoryid = req.query.id;

        const category = await Category.findOneAndDelete({
            _id: categoryid,
        });
        if (!category) {
            return errorResponse(res, {
                statusCode: 500,
                message:
                    "ctegory not found with thsi id, try another id to delete this",
            });
        }
        return successResponse(res, {
            statusCode: 200,
            message: "category deleted successfully",
            payload: category,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to delete product, try again later",
        });
    }
};
