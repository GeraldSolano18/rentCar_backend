import {Router} from 'express'
const router = Router();
import {verify} from '../middlewares'
import * as authCnt from '../controllers/auth.controller'
//import {verify} from '../middleware'



router.post("/register", verify.checkDuplicates, authCnt.register);

router.post("/login",authCnt.login);


export default router;