import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILearningModule extends Document {
  moduleName: string;
  moduleTitle: string;
  moduleDescription: string;
  cohortId: Types.ObjectId;
  articleId: Types.ObjectId;
  codelabId: Types.ObjectId;
}
//quizId: Types.ObjectId;

const LearningModuleSchema: Schema = new Schema({
  moduleName: { type: String, required: true },
  moduleTitle: { type: String, required: true },
  moduleDescription: { type: String },
  cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
  articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  codelabId: { type: Schema.Types.ObjectId, ref: 'Codelab', required: true },
  //quizId: { type: Schema.Types.ObjectId, ref: 'Quiz'},
});

export const LearningModule = mongoose.model<ILearningModule>('LearningModule', LearningModuleSchema);