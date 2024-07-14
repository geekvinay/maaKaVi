import {Cohort, ICohort } from '../../models/cohort/cohort';
import {Types } from "mongoose";

export const createCohortInDb = async (cohortData: ICohort) => {
  const cohort = new Cohort(cohortData);
  await cohort.save();
  return cohort;
};

export const getCohortFromDb = async (cohortId: string) => {
  const id = new Types.ObjectId(cohortId);
  const cohort = await Cohort.findById(id);
  return cohort;
};

export const updateCohortInDb = async (cohortId: string, cohortData: Partial<ICohort>) => {
  const id = new Types.ObjectId(cohortId);
  const cohort = await Cohort.findByIdAndUpdate(id, cohortData, { new: true });
  return cohort;
};