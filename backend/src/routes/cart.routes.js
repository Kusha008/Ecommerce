import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { addToCart,clearCart,getUserCart, removeItemFromCart, updateCartItem } from "../controllers/cart.controller.js";


const router=Router();

//add item to cart
router.route("/addto-cart").post(verifyJWT,addToCart);//working

router.route("/").get(verifyJWT,getUserCart);//working
router.route("/delete/:productId").delete(verifyJWT,removeItemFromCart);//working
router.route("/update").put(verifyJWT,updateCartItem);//working
router.route("/clear-cart").delete(verifyJWT,clearCart);//working


export default router;