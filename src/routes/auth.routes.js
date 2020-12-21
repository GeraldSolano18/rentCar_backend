import {Router} from 'express'
const router = Router();
import * as authCnt from '../controllers/auth.controller'
//import {verify} from '../middleware'



router.post("/register",authCnt.register);



export default router;