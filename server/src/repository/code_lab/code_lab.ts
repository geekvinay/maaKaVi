import {CodeLab,  ICodeLab } from '../../models/code_lab/code_labs';

export const createCodelabInDb = async (codelabData: ICodeLab) => {
  const codelab = new CodeLab(codelabData);
  await codelab.save();
  return codelab;
};

export const getCodelabFromDb = async (codelabId: string) => {
  const codelab = await CodeLab.findById(codelabId);
  return codelab;
};

export const updateCodelabInDb = async (codelabId: string, codelabData: Partial<ICodeLab>) => {
  const codelab = await CodeLab.findByIdAndUpdate(codelabId, codelabData, { new: true });
  return codelab;
};