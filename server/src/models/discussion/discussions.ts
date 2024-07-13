import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDiscussion extends Document {
  title: string;
  description: string;
  learningModuleId: Types.ObjectId;
  upvotes: number;
}

const DiscussionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  learningModuleId: {
    type: Schema.Types.ObjectId,
    ref: "LearningModule",
    required: true,
  },
  upvotes: { type: Number, default: 0 },
});

export const Discussion = mongoose.model<IDiscussion>(
  "Discussion",
  DiscussionSchema
);
