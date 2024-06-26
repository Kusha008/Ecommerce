import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                    //check if the quantity is always less than the stock available
                }
            }
        ],
        discountValue: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)
cartSchema.plugin(mongooseAggregatePaginate)
export const Cart = mongoose.model("Cart", cartSchema)