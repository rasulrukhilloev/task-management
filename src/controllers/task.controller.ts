import { Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { validateTask, validateTaskUpdate } from '../models/task.model';
import { AuthRequest } from '../types/express';
import { ApiError } from '../utils/apiError.utils';

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateTask(req.body);
      if (error) {
        throw new ApiError(400, 'Invalid input', error.details);
      }

      const task = await this.taskService.createTask(value, req.user!._id);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskService.getTasks(req.user!._id);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  getTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.getTask(req.params.id, req.user!._id);
      if (!task) {
        throw new ApiError(404, 'Task not found');
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateTaskUpdate(req.body);
      if (error) {
        throw new ApiError(400, 'Invalid input', error.details);
      }

      const task = await this.taskService.updateTask(req.params.id, value, req.user!._id);
      if (!task) {
        throw new ApiError(404, 'Task not found');
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.deleteTask(req.params.id, req.user!._id);
      if (!task) {
        throw new ApiError(404, 'Task not found');
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };
}