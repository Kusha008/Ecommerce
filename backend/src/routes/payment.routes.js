import { Router } from "express";
//import { verifyJwt, verifyUser } from "../middlewares/auth.middleware.js";

import {
  createOrder,
  verifyPayment,
  fetchOrder,
  fetchPayment,
  paymentfailure,
  getKeys,
} from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getKeys").post(verifyJWT, 
    //verifyUser, 
    getKeys);
router.route("/createOrder").post(verifyJWT, 
    //verifyUser, 
    createOrder);
router.route("/verifyPayment").post(verifyJWT, 
    //verifyUser,
     verifyPayment);
router.route("/paymentfailure").post(verifyJWT, paymentfailure);

router.route("/fetchOrder/:id").get(verifyJWT, fetchOrder);
router.route("/fetchPayment/:id").get(verifyJWT, fetchPayment);

export default router;
