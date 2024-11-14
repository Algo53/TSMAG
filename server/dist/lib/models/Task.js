"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the Task Schema
const taskSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    tags: {
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
});
// Create and export the Task model
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
