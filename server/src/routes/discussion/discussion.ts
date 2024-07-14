import express from "express";
import {
  createDiscussion,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getAllDiscussions
} from "../../controllers/discussion/discussion";

const discussionRouter = express.Router();

discussionRouter.post("/", createDiscussion);
discussionRouter.get("/:discussionId", getDiscussion);
discussionRouter.put("/:discussionId", updateDiscussion);
discussionRouter.delete("/:discussionId", deleteDiscussion);
discussionRouter.get("/all", getAllDiscussions);

export default discussionRouter;
