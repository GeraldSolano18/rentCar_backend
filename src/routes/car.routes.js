import {Router} from 'express'
const router = Router();
import {authJwt} from '../middlewares'
import * as carController from '../controllers/cars.controller'
//import {verify} from '../middleware'

router.get('/',carController.getCars)

router.get('/:carId',carController.getCarrById)

router.post('/',[authJwt.verifyToken,authJwt.isModerator],carController.createCar)

router.put('/:carId',[authJwt.verifyToken,authJwt.isAdmin], carController.updateCar)

router.delete('/:carId',[authJwt.verifyToken,authJwt.isAdmin], carController.deleteCar)


export default router;