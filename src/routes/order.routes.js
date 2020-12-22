import {Router} from 'express'
const router = Router();
import {authJwt} from '../middlewares'
import * as orderController from '../controllers/order.controller'

router.get('/',orderController.getOrders)

router.get('/user/:userId',orderController.getOrdersByUser)

router.post("/car/:carId",authJwt.verifyToken,orderController.createOrder);


export default router;