import { Request, Response } from 'express';
import { create, read, update } from '../../repository/learning_module/learning_module';
import { Types } from 'mongoose';
import { LearningModule } from '../../models/learning_module/learning_module';

export const createLearningModule = async (req: Request, res: Response) => {
  try {
	// typecaset the fields with types.ObjectId from string in body
	const learningModuleData = new LearningModule({
	  moduleName: req?.body?.moduleName,
	  moduleTitle: req?.body?.moduleTitle,
	  moduleDescription: req?.body?.moduleDescription,
	  cohortId: req?.body?.cohortId as Types.ObjectId,
	  articleId: req?.body?.articleId as Types.ObjectId,
	  codelabId: req?.body?.codelabId as Types.ObjectId,
	});
	const module = await learningModuleData.save();
	res.status(201).json(module);
  } catch (error: any) {
	res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLearningModule = async (req: Request, res: Response) => {
  try {
	const module = await read(req.params.learningModuleId);
	if (!module) {
	  return res.status(404).json({ error: 'Learning module not found' });
	}
	res.json(module);
  } catch (error: any) {
	res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLearningModule = async (req: Request, res: Response) => {
  try {
	const updatedModule = await update(req.params.learningModuleId, req.body);
	if (!updatedModule) {
	  return res.status(404).json({ error: 'Learning module not found' });
	}
	res.json(updatedModule);
  } catch (error: any) {
	res.status(500).json({ error: 'Internal server error' });
  }
};