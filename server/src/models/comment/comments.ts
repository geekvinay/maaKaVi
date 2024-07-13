import mongoose, { Schema, Document, Types } from 'mongoose';

interface IComment extends Document {
  text: string;
  upvotes: number;
  discussionId: Types.ObjectId;
  children: Types.ObjectId[];
  isParent: boolean;
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  discussionId: { type: Schema.Types.ObjectId, ref: 'Discussion', required: true },
  children: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
  isParent: { type: Boolean, required: true, default: false },
});

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);