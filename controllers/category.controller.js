import { defaultProjection } from "../helpers/defaultProjections.js";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import Category from "../models/category.model.js";

export const createCategoryControllers = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) {
            return errorResponse(res, {
                statusCode: 500,
                message: "category field is required",
            });
        }

        const existingCategory = await Category.findOne({ category });

        if (existingCategory) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Category already exists",
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
        const allCategory = await Category.find({}, defaultProjection);

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

export const updateCategoryControllers = async (req, res) => {
    try {
        const categoryid = req.query.id;
        const { name } = req.body;

        const updateCategory = await Category.findOneAndUpdate(
            { _id: categoryid },
            { name: name },
            { new: true }
        );

        if (!updateCategory) {
            return errorResponse(res, {
                statusCode: 500,
                message:
                    "ctegory not found with this id, try another id to delete this",
            });
        }
        return successResponse(res, {
            statusCode: 200,
            message: "category deleted successfully",
            payload: updateCategory,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to update product, try again later",
        });
    }
};
