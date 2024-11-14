import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for Task document
export interface ITask extends Document {
    owner: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: Date;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    tags?: string;
    // subtasks?: {
    //     title: string;
    //     isCompleted: boolean;
    // }[];
    // reminders?: Date[];
    // dependencies?: mongoose.Types.ObjectId[];
    // recurring?: {
    //     interval: 'daily' | 'weekly' | 'monthly';
    //     endDate?: Date;
    // };
    // timeTracking?: {
    //     startedAt: Date;
    //     duration: number; // in seconds
    // }[];
    // assignedTo?: mongoose.Types.ObjectId; // User ID
    progress: number;
}

// Define the Task Schema
const taskSchema: Schema = new Schema<ITask>(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            default: 'Medium',
        },
        dueDate: {
            type: Date,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        tags:
        {
            type: String,
            trim: true,
        },
        // subtasks: [
        //     {
        //         title: { type: String, required: true },
        //         isCompleted: { type: Boolean, default: false },
        //     },
        // ],
        // reminders: [
        //     {
        //         type: Date,
        //     },
        // ],
        // dependencies: [
        //     {
        //         type: mongoose.Types.ObjectId,
        //         ref: 'Task',
        //     },
        // ],
        // recurring: {
        //     interval: {
        //         type: String,
        //         enum: ['daily', 'weekly', 'monthly'],
        //     },
        //     endDate: {
        //         type: Date,
        //     },
        // },
        // timeTracking: [
        //     {
        //         startedAt: { type: Date, required: true },
        //         duration: { type: Number, required: true },
        //     },
        // ],
        // assignedTo: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'User',
        // },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
);

// Create and export the Task model
const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
