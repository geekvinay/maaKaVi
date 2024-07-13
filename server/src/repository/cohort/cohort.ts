import {Cohort, ICohort } from '../../models/cohort/cohorts';

export const createCohortInDb = async (cohortData: ICohort) => {
  const cohort = new Cohort(cohortData);
  await cohort.save();
  return cohort;
};

export const getCohortFromDb = async (cohortId: string) => {
  const cohort = await Cohort.findById(cohortId);
  return cohort;
};

export const updateCohortInDb = async (cohortId: string, cohortData: Partial<ICohort>) => {
  const cohort = await Cohort.findByIdAndUpdate(cohortId, cohortData, { new: true });
  return cohort;
};