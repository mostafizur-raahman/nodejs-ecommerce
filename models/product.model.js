import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
        },
        stock: {
            type: Number,
            required: [true, "Product stock is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        image: String,
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
