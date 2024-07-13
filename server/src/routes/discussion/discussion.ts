import express from 'express';
import { createDiscussion, getDiscussion, updateDiscussion, deleteDiscussion } from '../../controllers/discussion/discussion';

const DiscussionRouter = express.Router();

DiscussionRouter.post('/', createDiscussion);
DiscussionRouter.get('/:discussionId', getDiscussion);
DiscussionRouter.put('/:discussionId', updateDiscussion);
DiscussionRouter.delete('/:discussionId', deleteDiscussion);

export default DiscussionRouter;