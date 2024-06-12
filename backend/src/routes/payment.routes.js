import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { createOrder, fetchOrder, fetchPayment, getKeys, paymentfailure, verifyPayment } from "../controllers/payment.controller.js";

const router=Router();

router.route('/create-order').post(verifyJWT,createOrder);//working
router.route('/verify-payment').post(verifyPayment);
router.route('/fetch-order/:id').get(verifyJWT,fetchOrder);
router.route('/fetch-payment/:id').get(verifyJWT,fetchPayment);
router.route('/payment-failure').post(verifyJWT,paymentfailure);

router.route('/get-keys').get(verifyJWT,getKeys);

export default router;