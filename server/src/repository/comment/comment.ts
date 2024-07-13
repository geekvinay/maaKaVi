import { Comment, IComment } from "../../models/comment/comments";

export const create = async (commentData: IComment) => {
  const comment = new Comment(commentData);
  await comment.save();
  return comment;
};

export const read = async (commentId: string) => {
  const comment = await Comment.findById(commentId);
  return comment;
};

export const update = async (
  commentId: string,
  commentData: Partial<IComment>
) => {
  const comment = await Comment.findByIdAndUpdate(commentId, commentData, {
    new: true,
  });
  return comment;
};

export const remove = async (commentId: string) => {
  const result = await Comment.deleteOne({ _id: commentId });
  return result;
};
