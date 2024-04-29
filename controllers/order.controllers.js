import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrderControllers = async (req, res) => {
    try {
        const {
            shippingAddress,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemPrice,
            tax,
            shippingcharge,
            totalAmount,
            orderStatus,
        } = req.body;

        console.log(req.body);

        const order = await Order.create({
            shippingAddress,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemPrice,
            tax,
            shippingcharge,
            totalAmount,
            orderStatus,
        });

        // stock operations
        for (let i = 0; i < orderItems.length; i++) {
            const product = await Product.findById(orderItems[i].product);
            product.stock -= orderItems[i].quantity;
            await product.save();
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Order placed successfully",
            payload: order,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to create order",
        });
    }
};

// get order
export const getOrdersControllers = async (req, res) => {
    try {
        const orders = await Order.find();

        return successResponse(res, {
            statusCode: 200,
            message: "Orders fetched successfully",
            payload: orders,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to get orders, try again later",
        });
    }
};
