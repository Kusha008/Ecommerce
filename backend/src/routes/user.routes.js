import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser, registerUser,logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateEmail } from "../controllers/user.controller.js";

const router = Router();

//register user route
router.route('/register').post(
    upload.single('coverImage'),
    registerUser
)
//login route
router.route("/login").post(loginUser)

//secured routes - user needs to be logged in to perform these actions
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-email").post(verifyJWT,updateEmail)



export default router;
