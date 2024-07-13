import { Router } from 'express';
import { healthcheck } from '../../controllers/user/user';

const userRouter = Router();
userRouter.get('', healthcheck);

export default userRouter;
