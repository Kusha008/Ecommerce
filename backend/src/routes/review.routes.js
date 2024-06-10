import { Router } from "express";
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyisAdmin } from '../middlewares/admin.middleware.js';


import {
    postReview,
    updateReview,
    deleteReview,
    getReviews,
    getUserReviews,
    getReviewAdmin
} from "../controllers/review.controller.js";

const router = Router();

//creating deleting updating reviews
router.route("/post-review/:productId").post(verifyJWT,upload.single("reviewImage"),postReview)//working
router.route("/update-review/:reviewId").put(verifyJWT,upload.single("reviewImage"),updateReview)//working
router.route("/delete-review/:reviewId").delete(verifyJWT,deleteReview)//working

//getting reviews
router.route("/get-reviews/:productId").get(getReviews)//working
router.route("/get-user-reviews").get(verifyJWT,getUserReviews)//working
router.route("/get-review-admin").get(
    verifyJWT,
    verifyisAdmin,
    getReviewAdmin
)//working

export default router;