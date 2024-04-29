import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: [true, "Rating is required"],
        },
        comment: {
            type: String,
            required: [true, "Comment is required"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
