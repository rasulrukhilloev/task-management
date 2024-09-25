import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';
import { adminAuth } from '../middleware/auth.middleware';

const router = express.Router();
const adminService = new AdminService();
const adminController = new AdminController(adminService);

router.get('/analytics', adminAuth, adminController.getTaskAnalytics);

export default router;