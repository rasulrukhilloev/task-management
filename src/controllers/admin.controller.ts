import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';
import { ApiError } from '../utils/apiError.utils';

export class AdminController {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  getTaskAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const analytics = await this.adminService.getTaskAnalytics();
      res.json(analytics);
    } catch (error) {
      next(new ApiError(500, 'Failed to retrieve task analytics'));
    }
  };
}