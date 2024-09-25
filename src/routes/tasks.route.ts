import express from 'express';
import { TaskController  } from '../controllers/task.controller';
import { TaskService } from "../services/task.service";
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const taskService = new TaskService();
const taskController = new TaskController(taskService)

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.get('/:id', authMiddleware, taskController.getTask);
router.patch('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;