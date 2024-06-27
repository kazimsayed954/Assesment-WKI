import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post("/login", AuthController.loginUser);
router.post("/signup", AuthController.registerUser);

const authRouter = router;
export default authRouter;
