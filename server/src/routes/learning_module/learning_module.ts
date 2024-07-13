import express from 'express';
import { createLearningModule, getLearningModule, updateLearningModule } from '../../controllers/learning_module/learning_module';

const LearningModuleRouter = express.Router();

LearningModuleRouter.post('/', createLearningModule);
LearningModuleRouter.get('/:learningModuleId', getLearningModule);
LearningModuleRouter.put('/:learningModuleId', updateLearningModule);

export default LearningModuleRouter;