import { Router } from 'express';
import { createCohort, getCohort, updateCohort } from '../../controllers/cohort/cohort';

const cohortRouter = Router();

cohortRouter.post('/', createCohort);
cohortRouter.get('/:cohortId', getCohort);
cohortRouter.put('/:cohortId', updateCohort);

export default cohortRouter;