import mongoose, { Schema, Document, Types } from "mongoose";

export interface IArticle extends Document {
  cohortId: Types.ObjectId;
  articleContent: string; // Field to store markdown text
}

const ArticleSchema: Schema = new Schema({
  cohortId: { type: Schema.Types.ObjectId, required: false, default: null },
  articleContent: { type: String, required: true },
});

export const Article = mongoose.model<IArticle>("Article", ArticleSchema);
