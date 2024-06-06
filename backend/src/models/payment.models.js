import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    orderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentDate:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true,
        enum:["pending","completed","cancelled"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
})

const Payment=mongoose.model("Payment",paymentSchema)