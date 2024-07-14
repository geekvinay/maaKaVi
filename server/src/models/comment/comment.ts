import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment extends Document {
  text: string;
  userId: Types.ObjectId;
  upvotes: number;
  discussionId: Types.ObjectId;
  children: Types.ObjectId[];
  isParent: boolean;
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  upvotes: { type: Number, default: 0 },
  discussionId: {
    type: Schema.Types.ObjectId,
    ref: "Discussion",
    required: true,
  },
  children: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
  isParent: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
