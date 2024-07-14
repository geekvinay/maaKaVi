import { Request, Response } from 'express';
import { create, read, update } from '../../repository/learning_module/learning_module';

export const createLearningModule = async (req: Request, res: Response) => {
  try {
	const module = await create(req.body);
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