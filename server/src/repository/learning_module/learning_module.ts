import { LearningModule, ILearningModule } from "../../models/learning_module/learning_modules";

export const create = async (learningModuleData: ILearningModule) => {
  const module = new LearningModule(learningModuleData);
  await module.save();
  return module;
};

export const read = async (learningModuleId: string) => {
  const module = await LearningModule.findById(learningModuleId);
  return module;
}

export const update = async (learningModuleId: string, learningModuleData: Partial<ILearningModule>) => {
  const module = await LearningModule.findByIdAndUpdate(learningModuleId, learningModuleData, { new: true });
  return module;
};
