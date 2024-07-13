import { Discussion, IDiscussion } from "../../models/discussion/discussions";

export const create = async (discussionData: IDiscussion) => {
  const discussion = new Discussion(discussionData);
  await discussion.save();
  return discussion;
};

export const read = async (discussionId: string) => {
  const discussion = await Discussion.findById(discussionId);
  return discussion;
};

export const update = async (
  discussionId: string,
  discussionData: Partial<IDiscussion>
) => {
  const discussion = await Discussion.findByIdAndUpdate(
    discussionId,
    discussionData,
    { new: true }
  );
  return discussion;
};

export const remove = async (discussionId: string) => {
  const result = await Discussion.deleteOne({ _id: discussionId });
  return result;
};
