import { Router } from "express";
import { verifyJWT, verifyJWTforSeller, verifySeller } from "../middlewares/auth.middleware.js";
import { verifyisAdmin } from "../middlewares/admin.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';
import {
    registerSeller,
    loginSeller,
    logoutSeller,
    getCurrentSeller,
    refreshAccessToken,
    changeCurrentPassword,
    updatePhone,
    updateAddress,
    updateCoverImageSeller,
    deleteSeller,
    getAllSellers,
    getSellerById,
    verifyingSeller,
    sendVerificationEmailSeller,
    requestEmailUpdateSeller,
    verifyAndUpdateEmailSeller,
} from "../controllers/seller.controller.js";


const router = Router();

//register and login 
router.route("/register").post(upload.single("sellerImage"),registerSeller);//working
router.route("/login").post(loginSeller);//working

//seller login required in these
router.route("/logout").get(verifyJWTforSeller,logoutSeller);//working
router.route("/refresh-token").post(refreshAccessToken);//working
router.route("/current-seller").get(verifyJWTforSeller,getCurrentSeller);//working
router.route("/change-password").post(verifyJWTforSeller,changeCurrentPassword);//working
router.route("/update-phone").post(verifyJWTforSeller,updatePhone);//working
router.route("/update-address").post(verifyJWTforSeller,updateAddress);//working
router.route("/update-coverImage").post(verifyJWTforSeller,upload.single("sellerImage"),updateCoverImageSeller);//working
router.route("/delete-seller").delete(verifyJWTforSeller,deleteSeller);//working
router.route("/send-verification-email").get(verifyJWTforSeller,sendVerificationEmailSeller);//working
router.route("/verify-seller-otp").post(verifyJWTforSeller,verifyingSeller);//working
router.route("/request-email-update").post(verifyJWTforSeller,requestEmailUpdateSeller);//working
router.route("/verify-email-otp").post(verifyJWTforSeller,verifyAndUpdateEmailSeller);//working

//getting all sellers
router.route("/").get(
    //verifyJWT,
    //verifyisAdmin,
    getAllSellers
);//working but will look into it according to admin handling

router.route("/:sellerId").get(
    //verifyJWT,
    //verifyisAdmin,
    getSellerById
);//working

export default router;