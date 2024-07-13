import express from "express";
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from "../../controllers/comment/comment";

const CommentRouter = express.Router();

CommentRouter.post("/", createComment);
CommentRouter.get("/:commentId", getComment);
CommentRouter.put("/:commentId", updateComment);
CommentRouter.delete("/:commentId", deleteComment);

export default CommentRouter;
