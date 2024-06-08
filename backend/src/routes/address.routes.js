import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { addAddress, deleteAddress, updateAddress, userAddresses } from "../controllers/address.controller.js";


const router=Router();

router.route("/add-address").post(verifyJWT,addAddress);
router.route("/user-addresses").get(verifyJWT,userAddresses);
router.route("/delete/:id").delete(verifyJWT,deleteAddress);
router.route("/update/:id").put(verifyJWT,updateAddress);

export default router;
