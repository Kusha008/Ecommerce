import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'


const router=Router()

router.route('/').get(getProduct)