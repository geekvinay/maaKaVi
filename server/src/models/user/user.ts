import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  topDiscussions: Types.ObjectId[];
  chosenCohorts: Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  topDiscussions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
      default: [],
      limit: 10,
    },
  ],
  chosenCohorts: [
    { type: Schema.Types.ObjectId, ref: "Cohort", default: [] },
  ],
});

export const User = mongoose.model<IUser>("User", UserSchema);

// Authenticating the user
// fetch modules and cohorts in user entry in db
// fetch random discussions and fetch all comments by discussion id (comments hierarchy)
// fetch all top discussions (change limit to 10) by user id and fetch all comments by discussion id (comments hierarchy)
// populate wherever ref required while doing a get request (example learn_module)
