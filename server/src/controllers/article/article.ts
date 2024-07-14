import { Request, Response } from 'express';
import { createArticleInDb, getArticleFromDb, updateArticleInDb } from '../../repository/article/article';

export const createArticle = async (req: Request, res: Response) => {
  try {
	const article = await createArticleInDb(req.body);
	res.status(201).json(article);
  } catch (error: any) {
	res.status(500).json({ error: error.message });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
	const articleId = req.params.articleId;
	const article = await getArticleFromDb(articleId);
	if (article) {
	  res.json(article);
	} else {
	  res.status(404).json({ error: 'Article not found' });
	}
  } catch (error: any) {
	res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
	const articleId = req.params.articleId;
	const article = await updateArticleInDb(articleId, req.body);
	res.json(article);
  } catch (error: any) {
	res.status(500).json({ error: error.message });
  }
};