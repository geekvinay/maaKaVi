import {Article, IArticle } from '../../models/article/articles';

export const createArticleInDb = async (articleData: IArticle) => {
  const article = new Article(articleData);
  await article.save();
  return article;
};

export const getArticleFromDb = async (articleId: string) => {
  const article = await Article.findById(articleId);
  return article;
};

export const updateArticleInDb = async (articleId: string, articleData: Partial<IArticle>) => {
  const article = await Article.findByIdAndUpdate(articleId, articleData, { new: true });
  return article;
};