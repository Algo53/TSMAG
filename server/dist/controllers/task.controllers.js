"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addNewTask = exports.getAllTask = void 0;
const Task_1 = __importDefault(require("../lib/models/Task"));
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const allTask = yield Task_1.default.find({ owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
        res.status(200).json({ success: true, allTask });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
});
exports.getAllTask = getAllTask;
const addNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newTask = yield Task_1.default.create(Object.assign(Object.assign({}, req.body), { owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }));
        yield newTask.save();
        res.status(200).json({ success: true, message: "Task created successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
});
exports.addNewTask = addNewTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const taskId = req.body._id;
        const task = yield Task_1.default.findById({ _id: taskId });
        if (!task) {
            res.status(400).json({ success: false, message: "Task not exist. Enter a valid task id." });
            return;
        }
        if (task.owner != ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
            res.status(400).json({ success: false, message: "Unauthorized Access!" });
            return;
        }
        const updatedTask = yield Task_1.default.findByIdAndUpdate(taskId, Object.assign({}, req.body), { new: true });
        res.status(200).json({ success: true, updatedTask, message: "Task updated successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const taskId = id;
        const task = yield Task_1.default.findById({ _id: taskId });
        if (!task) {
            res.status(400).json({ success: false, message: "Task not exist. Enter a valid task id." });
            return;
        }
        if (task.owner != ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
            res.status(400).json({ success: false, message: "Unauthorized Access!" });
            return;
        }
        const deleteTask = yield Task_1.default.findByIdAndDelete(taskId);
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
});
exports.deleteTask = deleteTask;
