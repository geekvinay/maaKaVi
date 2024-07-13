import { Router } from 'express';
import { createUser, getUser, healthcheck } from '../../controllers/user/user';

const userRouter = Router();

// Existing route
userRouter.get('/healthcheck', healthcheck);

// New routes
userRouter.post('/create', createUser);
userRouter.get('/:userId', getUser);

export default userRouter;