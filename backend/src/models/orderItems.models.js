import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
    {
        orderID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        seller:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Seller",
            required:true
        }
    },
    {
        timestamps: true
    }
)

export const OrderItems=mongoose.model("OrderItems",orderItemsSchema)