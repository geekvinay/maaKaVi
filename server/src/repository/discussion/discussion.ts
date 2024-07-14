import { Discussion, IDiscussion } from "../../models/discussion/discussion";
import { Types } from "mongoose";
import { getUserFromDb } from "../user/user";

export const create = async (data: any) => {
  try {
    const discussion = new Discussion(data?.discussion);
    const user = await getUserFromDb(data?.userId);
    if (user) {
      const discussions = user.topDiscussions;
      discussions.push(discussion._id as Types.ObjectId);
      // get only top 10 discussions
      //@ts-ignore
      discussions.sort(async (a, b) => {
        const discussionA = await read(a.toString());
        const discussionB = await read(b.toString());
        if (discussionB !== null && discussionA !== null) {
          return discussionB.upvotes - discussionA.upvotes;
        } else {
          return 0;
        }
      });
      user.topDiscussions = discussions.slice(0, 10);
      await user.save();  
    }
    return discussion;
  } catch (error: any) {
    throw new Error(
      "Failed to create discussion and update user: " + error.message
    );
  }
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
  const discussion = await Discussion.findByIdAndUpdate(id, discussionData, {
    new: true,
  });
  return discussion;
};

export const remove = async (discussionId: string) => {
  const id = new Types.ObjectId(discussionId);
  const result = await Discussion.deleteOne({ _id: id });
  return result;
};

export const all = async () => {
  const discussions = await Discussion.find({}).limit(10);
  return discussions;
};
