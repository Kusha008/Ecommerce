import { Router } from "express";

import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyisAdmin } from '../middlewares/admin.middleware.js';
import {
    createCategory,
    getCategoryById,
    getCategories,
    getCategoryByName,
    updateCategory,
    updateCategoryImage,
    deleteCategoryById,
    deleteCategoryByName,
    getCategoriesAdmin
} from "../controllers/category.controller.js";
import {upload} from "../middlewares/multer.middleware.js";


const router = Router();

//creating updating deleting categories
router.route("/create-category").post(
    verifyJWT,
    verifyisAdmin,
    upload.single("categoryImage"),
    createCategory
)//working

router.route("/update-category/:categoryId").put(
    verifyJWT,
    verifyisAdmin,
    updateCategory
)//working

router.route("/update-category-image/:categoryId").put(
    verifyJWT,
    verifyisAdmin,
    upload.single("categoryImage"),
    updateCategoryImage
)//working

router.route("/delete-category/:categoryId").delete(
    verifyJWT,
    verifyisAdmin,
    deleteCategoryById
)//working

router.route("/delete-category-name/:categoryName").delete(
    verifyJWT,
    verifyisAdmin,
    deleteCategoryByName
)//working

//getting all categories
router.route("/").get(getCategories);//working
router.route("/:categoryId").get(getCategoryById);//working
router.route("/name/:categoryName").get(getCategoryByName);//working
router.route("/allcategories/admin").get(getCategoriesAdmin);//working


export default router;

