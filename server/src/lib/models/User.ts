import { Document, model, Schema } from "mongoose";

// Define an interface for User
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// Define the User Schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

// Create and export the User model
const User = model<IUser>('User', userSchema);
export default User;