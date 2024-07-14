import {CodeLab,  ICodeLab } from '../../models/code_lab/code_lab';
import {Types } from "mongoose";

export const createCodelabInDb = async (codelabData: ICodeLab) => {
  const codelab = new CodeLab(codelabData);
  await codelab.save();
  return codelab;
};

export const getCodelabFromDb = async (codelabId: string) => {
  const id = new Types.ObjectId(codelabId);
  const codelab = await CodeLab.findById(id);
  return codelab;
};

export const updateCodelabInDb = async (codelabId: string, codelabData: Partial<ICodeLab>) => {
  const id = new Types.ObjectId(codelabId);
  const codelab = await CodeLab.findByIdAndUpdate(id, codelabData, { new: true });
  return codelab;
};