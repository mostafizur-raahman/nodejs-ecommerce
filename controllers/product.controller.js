import Product from "../models/product.model.js";
import { successResponse, errorResponse } from "../helpers/responseHandler.js";
import { defaultProjection } from "../helpers/defaultProjections.js";

// GET all products
export const getAllProductsControllers = async (req, res) => {
    try {
        const products = await Product.find({}, defaultProjection);

        return successResponse(res, {
            statusCode: 200,
            message: "Product fetched successfully",
            payload: products,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to get products, try again later",
        });
    }
};

export const getSingleProducControllers = async (req, res) => {
    try {
        const id = req.query.id;
        const product = await Product.findById(id, defaultProjection);

        // if (!product) {
        //     return errorResponse(res, {
        //         statusCode: 500,
        //         message: "Failed to get products, try again later",
        //     });
        // }
        return successResponse(res, {
            statusCode: 200,
            message: "User fetched successfully",
            payload: product,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to get products, try again later",
        });
    }
};

export const createProductControllers = async (req, res) => {
    try {
        const { name, description, price, category, stock, image, quantity } =
            req.body;

        if (!name || !price || !stock) {
            return errorResponse(res, {
                statusCode: 500,
                message: "name, price or stcok are required filed",
            });
        }

        const obj = {
            name,
            description,
            price,
            category,
            stock,
            image,
            quantity,
        };

        const product = await Product.create({ ...obj });

        return successResponse(res, {
            statusCode: 200,
            message: "product create successfully",
            payload: product,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to get products, try again later",
        });
    }
};

export const updateProductControllers = async (req, res) => {
    try {
        const productId = req.query.id;

        const product = await Product.findById(productId);

        if (!product) {
            return errorResponse(res, {
                statusCode: 404,
                message: "Product not found, try again later",
            });
        }

        const { name, description, price, category, stock, image } = req.body;

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (stock) product.stock = stock;
        if (image) product.image = image;

        const updateProduct = await product.save();

        return successResponse(res, {
            statusCode: 200,
            message: "User fetched successfully",
            payload: updateProduct,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to update products, try again later",
        });
    }
};

export const deleteProductControllers = async (req, res) => {
    try {
        const productId = req.query.id;
        const deleteProduct = await Product.findOneAndDelete({
            _id: productId,
        });

        if (!deleteProduct) {
            return errorResponse(res, {
                statusCode: 500,
                message: "can not find this products, try again later",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "product deleted successfully",
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to delete product, try again later",
        });
    }
};

// sorting products ascending and descending
export const sortProductsControllers = async (req, res) => {
    try {
        const sort = req.query.sort;
        const products = await Product.find({}, defaultProjection).sort({
            price: sort,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "Product fetched successfully",
            payload: products,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to get products, try again later",
        });
    }
};
