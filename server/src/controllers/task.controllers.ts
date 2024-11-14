import { Request, Response } from "express";
import Task from "../lib/models/Task";

export const getAllTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const allTask = await Task.find({owner: (req as any).user?.userId})
        res.status(200).json({ success: true, allTask});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
        return
    }
}

export const addNewTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const newTask = await Task.create({
            ...req.body,
            owner: (req as any).user?.userId
        })
        await newTask.save();
        res.status(200).json({ success: true, message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
        return
    }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.body._id;
        const task = await Task.findById({_id : taskId});
        if (!task) {
            res.status(400).json({ success: false, message: "Task not exist. Enter a valid task id." });
            return
        }
        if (task.owner != (req as any).user?.userId) {
            res.status(400).json({ success: false, message: "Unauthorized Access!" });
            return
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, { ...req.body }, { new: true });
        res.status(200).json({ success: true, updatedTask,  message: "Task updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
        return
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id}  = req.params;
        const taskId = id;
        const task = await Task.findById({ _id: taskId});
        if (!task) {
            res.status(400).json({ success: false, message: "Task not exist. Enter a valid task id." });
            return
        }

        if (task.owner != (req as any).user?.userId) {
            res.status(400).json({ success: false, message: "Unauthorized Access!" });
            return
        }

        const deleteTask = await Task.findByIdAndDelete(taskId);
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
        return
    }
}       