import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser, registerUser,logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updatePhone, updateCoverImage, requestEmailUpdate, verifyAndUpdateEmail, sendVerificationEmail, verifyUser, updateFullName, generateEmailOTP, verifyOTP } from "../controllers/user.controller.js";

const router = Router();

//register user route
router.route('/register').post(
    upload.single('coverImage'),
    registerUser
)
//login route
router.route("/login").post(loginUser)

//secured routes - user needs to be logged in to perform these actions
router.route("/verify-user").get(verifyJWT,sendVerificationEmail)
router.route("/verify-user-otp").post(verifyJWT,verifyUser)
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-phone").patch(verifyJWT,updatePhone)
router.route("/update-coverImage").patch(verifyJWT,upload.single('coverImage'),updateCoverImage)
router.route('/update-fullname').patch(verifyJWT, updateFullName)

router.route('/update-email').post(verifyJWT, requestEmailUpdate);
router.route('/verify-email-otp').post(verifyJWT, verifyAndUpdateEmail);
router.route('/generate-email-otp').post(verifyJWT, generateEmailOTP);
router.route('/verifyotp').post(verifyJWT, verifyOTP);

export default router;
