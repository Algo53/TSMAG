import express from 'express';
import { addNewTask, deleteTask, getAllTask, updateTask } from '../controllers/task.controllers';
import { authenticate } from '../middleware/authenticate';
const router = express.Router();

router.get('/', authenticate, getAllTask); 
router.post('/add', authenticate, addNewTask); 
router.put('/update/:id', authenticate, updateTask); 
router.delete('/delete/:id', authenticate, deleteTask); 

export default router;