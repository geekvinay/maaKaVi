import { Request, Response } from "express";
import {
  create,
  read,
  update,
  remove,
  all
} from "../../repository/discussion/discussion";


export const createDiscussion = async (req: Request, res: Response) => {
  try {
    const discussion = await create(req.body);
    res.status(201).json(discussion);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDiscussion = async (req: Request, res: Response) => {
  try {
    const discussion = await read(req.params.discussionId);
    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }
    res.json(discussion);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDiscussion = async (req: Request, res: Response) => {
  try {
    const updatedDiscussion = await update(req.params.discussionId, req.body);
    if (!updatedDiscussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }
    res.json(updatedDiscussion);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDiscussion = async (req: Request, res: Response) => {
  try {
    const result = await remove(req.params.discussionId);
    if (!result.deletedCount) {
      return res.status(404).json({ error: "Discussion not found" });
    }
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllDiscussions = async (req: Request, res: Response) => {
  try {
    console.log('aewrt');
    const discussions = await all();
    console.log('discussions: ', discussions);
    res.status(200).json(discussions);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
};
