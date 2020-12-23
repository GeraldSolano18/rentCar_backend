import {Router} from 'express'
const router = Router();
import {authJwt} from '../middlewares'
import * as orderController from '../controllers/order.controller'

router.get('/',orderController.getOrders)

router.get('/user/:userId',orderController.getOrdersByUser)

router.post("/car/:carId",authJwt.verifyToken,orderController.createOrder);

router.put('/:orderId',[authJwt.verifyToken,authJwt.isModerator],orderController.acceptOrder)

router.put('/finalize/:orderId',[authJwt.verifyToken,authJwt.isModerator],orderController.finalizeOrder)

export default router;