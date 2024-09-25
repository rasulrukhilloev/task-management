import { TaskModel, ITask } from '../models/task.model';
import mongoose from 'mongoose';

export class TaskService {
  async createTask(taskData: Partial<ITask>, ownerId: mongoose.Types.ObjectId): Promise<ITask> {
    const task = new TaskModel({
      ...taskData,
      owner: ownerId
    });
    await task.save();
    return task;
  }

  async getTasks(ownerId: mongoose.Types.ObjectId): Promise<ITask[]> {
    return TaskModel.find({ owner: ownerId });
  }

  async getTask(taskId: string, ownerId: mongoose.Types.ObjectId): Promise<ITask | null> {
    return TaskModel.findOne({ _id: taskId, owner: ownerId });
  }

  async updateTask(taskId: string, updateData: Partial<ITask>, ownerId: mongoose.Types.ObjectId): Promise<ITask | null> {
    const task = await TaskModel.findOne({ _id: taskId, owner: ownerId });
    if (!task) {
      return null;
    }

    Object.assign(task, updateData);
    await task.save();
    return task;
  }

  async deleteTask(taskId: string, ownerId: mongoose.Types.ObjectId): Promise<ITask | null> {
    return TaskModel.findOneAndDelete({ _id: taskId, owner: ownerId });
  }
}