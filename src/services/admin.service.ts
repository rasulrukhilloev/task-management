import { TaskModel } from '../models/task.model';

export class AdminService {
  async getTaskAnalytics() {
    return TaskModel.aggregate([
      {
        $group: {
          _id: '$owner',
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$user.name',
          totalTasks: 1,
          completedTasks: 1,
          completionRate: {
            $divide: ['$completedTasks', '$totalTasks']
          }
        }
      }
    ]);
  }
}