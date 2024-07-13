import express from "express";
import {
  createLearningModule,
  getLearningModule,
  updateLearningModule,
} from "../../controllers/learning_module/learning_module";

const learningModuleRouter = express.Router();

learningModuleRouter.post("/", createLearningModule);
learningModuleRouter.get("/:learningModuleId", getLearningModule);
learningModuleRouter.put("/:learningModuleId", updateLearningModule);

export default learningModuleRouter;
