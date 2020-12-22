import {Router} from 'express'
import * as userController from '../controllers/user.controller'
import {authJwt} from '../middlewares'
const router = Router()

router.get('/', userController.getUsers)

router.get("/:userId", userController.getUserById)

router.post("/",[authJwt.verifyToken,authJwt.isModerator], userController.createUser)

router.put("/:userId",[authJwt.verifyToken,authJwt.isAdmin],userController.updateUser)

router.delete("/:userId",[authJwt.verifyToken,authJwt.isAdmin],userController.deleteUser)

export default router;