import {Article, IArticle } from '../../models/article/article';
import {Types } from "mongoose";

export const createArticleInDb = async (articleData: IArticle) => {
  const article = new Article(articleData);
  await article.save();
  return article;
};

export const getArticleFromDb = async (articleId: string) => {
  const id = new Types.ObjectId(articleId);
  const article = await Article.findById(id);
  return article;
};

export const updateArticleInDb = async (articleId: string, articleData: Partial<IArticle>) => {
  const id = new Types.ObjectId(articleId);
  const article = await Article.findByIdAndUpdate(id, articleData, { new: true });
  return article;
};