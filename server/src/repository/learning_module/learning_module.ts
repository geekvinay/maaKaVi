import { LearningModule, ILearningModule } from "../../models/learning_module/learning_module";
import { Types } from "mongoose";

export const create = async (learningModuleData: ILearningModule) => {
  const module = new LearningModule(learningModuleData);
  await module.save();
  return module;
};

export const read = async (learningModuleId: string) => {
  const id = new Types.ObjectId(learningModuleId);
  const module = await LearningModule.findById(id);
  return module;
}

export const update = async (learningModuleId: string, learningModuleData: Partial<ILearningModule>) => {
  const id = new Types.ObjectId(learningModuleId);
  const module = await LearningModule.findByIdAndUpdate(id, learningModuleData, { new: true });
  return module;
};


// get all learning modules with given cohort id 
export const getLearningModulesByCohortId = async (cohortId: string) => {
  const id = new Types.ObjectId(cohortId);
  const modules = await LearningModule.find({ cohort: id});
  return modules;
};