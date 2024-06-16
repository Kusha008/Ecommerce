import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { addToCart,checkOutCart,clearCart,getCart,getCartValue,getUserCart, removeItemFromCart, updateCartItem } from "../controllers/cart.controller.js";


const router=Router();

//add item to cart
router.route("/addto-cart").post(verifyJWT,addToCart);//working

router.route("/get-cart").get(verifyJWT,getUserCart);//working
router.route("/delete/:productId").delete(verifyJWT,removeItemFromCart);//working
router.route("/update").put(verifyJWT,updateCartItem);//working
router.route("/clear-cart").delete(verifyJWT,clearCart);//working
router.route("/get-cart-value").get(verifyJWT,getCartValue);//working
router.route("/get-detailed-cart").get(verifyJWT,getCart);
router.route("/checkout").get(verifyJWT,checkOutCart);


export default router;