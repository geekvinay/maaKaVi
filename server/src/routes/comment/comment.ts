import express from "express";
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from "../../controllers/comment/comment";

const commentRouter = express.Router();

commentRouter.post("/", createComment);
commentRouter.get("/:commentId", getComment);
commentRouter.put("/:commentId", updateComment);
commentRouter.delete("/:commentId", deleteComment);

export default commentRouter;
