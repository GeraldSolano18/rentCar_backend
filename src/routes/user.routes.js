import {Router} from 'express'
import * as userController from '../controllers/user.controller'
import {authJwt, verify} from '../middlewares'
const router = Router()

router.get('/', userController.getUsers)

router.get("/:userId", userController.getUserById)

router.post("/",[authJwt.verifyToken,
    verify.checkDuplicates,
    authJwt.isAdmin,
    verify.checkRolesExisted
], userController.createUser)

router.put("/:userId",[authJwt.verifyToken,
    authJwt.isAdmin,
    verify.checkRolesExisted
],userController.updateUser)

router.delete("/:userId",[authJwt.verifyToken,authJwt.isAdmin],userController.deleteUser)

export default router;