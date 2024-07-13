import mongoose, { Schema, Document } from 'mongoose';

interface ICohort extends Document {
  cohortName: string;
  enrolledCount: number;
}

const CohortSchema: Schema = new Schema({
  cohortName: { type: String, required: true },
  enrolledCount: { type: Number, default: 0 },
});

export const Cohort = mongoose.model<ICohort>('Cohort', CohortSchema);