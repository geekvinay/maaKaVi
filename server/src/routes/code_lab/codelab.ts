import { Router } from 'express';
import { createCodelab, getCodelab, updateCodelab } from '../../controllers/code_lab/code_lab';

const codelabRouter = Router();

codelabRouter.post('/', createCodelab);
codelabRouter.get('/:codelabId', getCodelab);
codelabRouter.put('/:codelabId', updateCodelab);

export default codelabRouter;