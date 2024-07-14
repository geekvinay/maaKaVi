import { Discussion, IDiscussion } from "../../models/discussion/discussion";
import { Types } from "mongoose";

export const create = async (discussionData: IDiscussion) => {
  const discussion = new Discussion(discussionData);
  await discussion.save();
  return discussion;
};

export const read = async (discussionId: string) => {
  const id = new Types.ObjectId(discussionId);
  const discussion = await Discussion.findById(id);
  return discussion;
};

export const update = async (
  discussionId: string,
  discussionData: Partial<IDiscussion>
) => {
  const id = new Types.ObjectId(discussionId);
  const discussion = await Discussion.findByIdAndUpdate(
    id,
    discussionData,
    { new: true }
  );
  return discussion;
};

export const remove = async (discussionId: string) => {
  const id = new Types.ObjectId(discussionId);
  const result = await Discussion.deleteOne({ _id: id });
  return result;
};