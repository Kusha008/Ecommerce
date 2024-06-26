import { Router } from 'express';

import {addAddress
    ,userAddresses
    ,deleteAddress
    ,updateAddress
} from '../controllers/address.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/add").post(verifyJWT, addAddress);
router.route("/").get(verifyJWT, userAddresses);
router.route("/remove/:addressId").delete(verifyJWT, deleteAddress);
router.route("/update/:addressId").patch(verifyJWT, updateAddress);

export default router;