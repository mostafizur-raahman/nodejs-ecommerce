import { defaultProjection } from "../helpers/defaultProjections.js";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import Order from "../models/order.model.js";
import Review from "../models/review.model.js";

export const createReviewControllers = async (req, res) => {
    try {
        const { order, rating, comment, user } = req.body;
        console.log(req.body);

        if (!order || !rating || !comment || !user) {
            return errorResponse(res, {
                statusCode: 500,
                message: "order, rating , user and comment field is required",
            });
        }
        // check order id
        const existingOrder = await Order.findOne({ _id: order });
        console.log(existingOrder);

        if (!existingOrder) {
            return errorResponse(res, {
                statusCode: 404,
                message: "order not found",
            });
        }
        // check if review already exists
        const existingReview = await Review.findOne({ order });
        console.log(existingReview);
        if (existingReview) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Review already exists",
            });
        }
        // create review
        const _doc = await Review.create({ order, rating, comment, user });

        return successResponse(res, {
            statusCode: 200,
            message: "Review created successfully",
            payload: _doc,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to create review, try again later",
        });
    }
};
