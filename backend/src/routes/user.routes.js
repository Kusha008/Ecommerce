import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

//register user route
router.route('/register').post(
    upload.single('coverImage'),
    registerUser
)
//login route
router.route("/login").post(loginUser)


export default router;
