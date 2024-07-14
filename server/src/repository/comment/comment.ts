import { Comment, IComment } from "../../models/comment/comment";
import {Types } from "mongoose";


export const create = async (commentData: IComment) => {
  const comment = new Comment(commentData);
  await comment.save();
  return comment;
};

export const read = async (commentId: string) => {
  const id = new Types.ObjectId(commentId);
  const comment = await Comment.findById(id);
  return comment;
};

export const update = async (
  commentId: string,
  commentData: Partial<IComment>
) => {
  const id = new Types.ObjectId(commentId);
  const comment = await Comment.findByIdAndUpdate(id, commentData, {
    new: true,
  });
  return comment;
};

export const remove = async (commentId: string) => {
  const id = new Types.ObjectId(commentId);
  const result = await Comment.deleteOne({ _id: id });
  return result;
};
