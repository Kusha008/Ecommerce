import {Router} from "express"
import { verifyJWT, verifyJWTforSeller, verifySeller } from "../middlewares/auth.middleware.js";
import { verifyisAdmin } from "../middlewares/admin.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';
import {
    createOrder,
    getOrderByUser,
    getOrdersByAllForAdmin
} from "../controllers/order.controller.js";


const router = Router()

//creating the order
router.route("/createOrder").post(
    verifyJWT,
    createOrder
)

//getting the order
router.route("/getOrderByUser").get(
    verifyJWT,
    getOrderByUser
)//will check again later made some changes for payment

router.route("/getOrdersByAllForAdmin").get(
    verifyJWT,
    //verifyisAdmin,
    getOrdersByAllForAdmin
)//will check later made some changes for payment


export default router