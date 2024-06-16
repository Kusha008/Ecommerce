import {Router} from "express"
import { verifyJWT, verifyJWTforSeller, verifySeller } from "../middlewares/auth.middleware.js";
import { verifyisAdmin } from "../middlewares/admin.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductbyCategory, 
    getProductbyId, 
    getProductbySeller, 
    getProducts, 
    searchProducts, 
    updateProduct 
} from "../controllers/product.controller.js";



const router=Router();


//getting the products
router.route("/").get(getProducts);//working
router.route("/p/:productId").get(getProductbyId);//working
router.route("/category/:categoryId").get(getProductbyCategory)//working
router.route("/admin").get(
    verifyJWT,
    verifyisAdmin,
    getAllProducts
)//working
router.route("/seller").get(verifyJWTforSeller,getProductbySeller)//working

//creating the product
router.route("/createProduct").post(
    verifyJWTforSeller,
    verifySeller,
    upload.array('productImages',3),
    createProduct
);//working

//updating and deleting the product
router.route("/update/:productId").put(verifyJWTforSeller,updateProduct)//working
router.route("/delete/:productId").delete(verifyJWTforSeller,deleteProduct)//working
router.route('/search').get(searchProducts);

export default router;