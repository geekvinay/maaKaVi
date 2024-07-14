import { Router } from 'express';
import {getUser, healthcheck, getUserCohorts, getUserTopDiscussions } from '../../controllers/user/user';

const userRouter = Router();

// Existing route
userRouter.get('/healthcheck', healthcheck);

// New routes
userRouter.get('/:userId', getUser);

userRouter.get('/:userId/cohorts', getUserCohorts);

userRouter.get('/:userId/topdiscussions', getUserTopDiscussions);

export default userRouter;