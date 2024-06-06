import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            maxVal: 5,
        },
        reviewDate: {
            type: Date,
            default: Date.now
        },
        isVerfied: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Review = mongoose.model("Review", reviewSchema)