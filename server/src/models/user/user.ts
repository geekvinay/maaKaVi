import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    topDiscussions: Types.ObjectId[]; 
    chosenCohorts: Types.ObjectId[]; 
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    topDiscussions: [{ type: Schema.Types.ObjectId, ref: 'Discussion', required: true, limit: 5 }],
    chosenCohorts: [{ type: Schema.Types.ObjectId, ref: 'Cohort', required: true }],
});

export const User = mongoose.model<IUser>('User', UserSchema);
