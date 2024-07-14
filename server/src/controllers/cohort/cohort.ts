import { Request, Response } from 'express';
import { createCohortInDb, getCohortFromDb, updateCohortInDb } from '../../repository/cohort/cohort';

export const createCohort = async (req: Request, res: Response) => {
  try {
	const cohort = await createCohortInDb(req.body);
	res.status(201).json(cohort);
  } catch (error: any) {
	res.status(500).json({ error: error.message });
  }
};

export const getCohort = async (req: Request, res: Response) => {
  try {
	const cohortId = req.params.cohortId;
	const cohort = await getCohortFromDb(cohortId);
	if (cohort) {
	  res.json(cohort);
	} else {
	  res.status(404).json({ error: 'Cohort not found' });
	}
  } catch (error: any) {
	res.status(500).json({ error: error.message });
  }
};

export const updateCohort = async (req: Request, res: Response) => {
  try {
	const cohortId = req.params.cohortId;
	const cohort = await updateCohortInDb(cohortId, req.body);
	res.json(cohort);
  } catch (error: any) {
	res.status(500).json({ error: error.message });
  }
};