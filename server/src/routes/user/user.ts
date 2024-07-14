import { Router } from 'express';
import {getUser, healthcheck, getUserCohorts } from '../../controllers/user/user';
import { registerUser, loginUser } from '../../controllers/auth/auth';

const userRouter = Router();

// Existing route
userRouter.get('/healthcheck', healthcheck);

// New routes
userRouter.post('/create', registerUser);
userRouter.get('/:userId', getUser);
userRouter.post('/login', loginUser);

userRouter.get('/user/:userId/cohorts', getUserCohorts);

export default userRouter;