import express from "express";
import {
  createDiscussion,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
} from "../../controllers/discussion/discussion";

const discussionRouter = express.Router();

discussionRouter.post("/", createDiscussion);
discussionRouter.get("/:discussionId", getDiscussion);
discussionRouter.put("/:discussionId", updateDiscussion);
discussionRouter.delete("/:discussionId", deleteDiscussion);

export default discussionRouter;
