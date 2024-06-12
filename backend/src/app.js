import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import addressRouter from './routes/address.routes.js'
import productRouter from './routes/product.routes.js'
import sellerRouter from './routes/seller.routes.js'
import categoryRouter from './routes/category.routes.js'
import cartRouter from './routes/cart.routes.js'
import reviewRouter from './routes/review.routes.js'
import offerRouter from './routes/offers.routes.js'
import paymentRouter from './routes/payment.routes.js'

//routes declaration
app.use('/api/v1/users',userRouter)
app.use('/api/v1/users/addresses',addressRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/sellers',sellerRouter)
app.use('/api/v1/categories',categoryRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/offers',offerRouter)
app.use('/api/v1/payments',paymentRouter)


//http://localhost:8000/api/v1/user/register


export {app}