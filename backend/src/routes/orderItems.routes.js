import { Router } from "express";
import { verifyJWT, verifyJWTforSeller, verifySeller } from "../middlewares/auth.middleware.js";
import { verifyisAdmin } from "../middlewares/admin.middleware.js";
import {
    createOrderItems,
    getOrderItems,
    getOrderBySellers,
    getOrderItemById,
    updateOrderStatus,
    getAllOrderAndDetails
} from "../controllers/orderItems.controller.js";

const router = Router()

router.route("/create").post(verifyJWT, createOrderItems)
router.route("/:orderID").get(verifyJWT, getOrderItems)

router.route("/seller/allorders").get(verifyJWTforSeller, getOrderBySellers)
router.route("/status/:itemId").get(verifyJWT, getOrderItemById)
router.route("/status/:orderItemId").put(verifyJWT, updateOrderStatus)


router.route("/").get(
    verifyJWT, 
    //verifyisAdmin,
    getAllOrderAndDetails 
)

export default router;