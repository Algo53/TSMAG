"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controllers_1 = require("../controllers/task.controllers");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.get('/', authenticate_1.authenticate, task_controllers_1.getAllTask);
router.post('/add', authenticate_1.authenticate, task_controllers_1.addNewTask);
router.put('/update/:id', authenticate_1.authenticate, task_controllers_1.updateTask);
router.delete('/delete/:id', authenticate_1.authenticate, task_controllers_1.deleteTask);
exports.default = router;
