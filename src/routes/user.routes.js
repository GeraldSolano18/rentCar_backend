import {Router} from 'express'
import * as userController from '../controllers/user.controller'
//import {authJwt, verify} from '../middleware'
const router = Router();

router.get('/', userController.getUsers)

router.get("/:userId", userController.getUserById);

router.post("/", userController.createUser)

router.put("/:userId",userController.updateUser)
router.delete("/:userId",userController.deleteUser)

export default router;