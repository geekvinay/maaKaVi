import { Request, Response } from "express";
import { create, read, update, remove } from "../../repository/comment/comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await create(req.body);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const comment = await read(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const updatedComment = await update(req.params.commentId, req.body);
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const result = await remove(req.params.commentId);
    if (!result.deletedCount) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};
