import { Router } from 'express';
import { createArticle, getArticle, updateArticle } from '../../controllers/article/article';

const articleRouter = Router();

articleRouter.post('/', createArticle);
articleRouter.get('/:articleId', getArticle);
articleRouter.put('/:articleId', updateArticle);

export default articleRouter;