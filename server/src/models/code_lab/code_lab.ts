import mongoose, { Schema, Document, Types } from "mongoose";

enum Language {
  JavaScript = "JavaScript",
  Python = "Python",
  Java = "Java",
  CSharp = "C#",
  PHP = "PHP",
  TypeScript = "TypeScript",
  CPlusPlus = "C++",
  C = "C",
  Ruby = "Ruby",
  Swift = "Swift",
}

export interface ICodeLab extends Document {
  initialCode: string;
  finalCode: string;
  language: Language;
  attemptedCount: number;
}

const CodeLabSchema: Schema = new Schema({
  initialCode: { type: String, required: true },
  solutionCode: { type: String, required: true },
  language: { type: String, required: true, enum: Object.values(Language) },
  attemptedCount: { type: Number, required: true, default: 0 },
});

export const CodeLab = mongoose.model<ICodeLab>("CodeLab", CodeLabSchema);
