import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        shippingAddress: {
            address: {
                type: String,
                required: [true, "Address is required"],
            },
            city: {
                type: String,
                required: [true, "city is required"],
            },
            country: {
                type: String,
                required: [true, "country is required"],
            },
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: [true, "ordrer name is required"],
                },
                quantity: {
                    type: Number,
                    required: [true, "ordrer quantity is required"],
                },
            },
        ],
        paymentMethod: {
            type: String,
            enum: ["Stripe", "CREDIT CARD", "BKASH", "COD", "NAGAD"],
            default: "Stripe",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        paidAt: Date,
        paymentInfo: {
            id: String,
            status: String,
        },
        itemPrice: {
            type: Number,
        },
        tax: {
            type: Number,
            required: [true, "ordrer tax is required"],
        },
        shippingcharge: {
            type: Number,
            required: [true, "ordrer shippingcharge is required"],
        },
        totalAmount: {
            type: Number,
            required: [true, "ordrer total amount is required"],
        },
        orderStatus: {
            type: String,
            enum: ["processing", "shipped", "delivered", "cancelled"],
            default: "processing",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
