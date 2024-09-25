import { Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { validateUser, validateLogin } from '../models/user.model';
import { AuthRequest } from '../types/express';
import { ApiError } from '../utils/apiError.utils';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateUser(req.body);
      if (error) {
        throw new ApiError(400, 'Invalid input', error.details);
      }

      const { user, token } = await this.authService.register(value);
      res.status(201).json({ user, token });
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if ((error as any).code === 11000) {
        next(new ApiError(400, 'Email already in use'));
      } else {
        next(new ApiError(400, 'Registration failed'));
      }
    }
  };

  login = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateLogin(req.body);
      if (error) {
        throw new ApiError(400, 'Invalid input', error.details);
      }

      const { user, token } = await this.authService.login(value.email, value.password);
      res.json({ user, token });
    } catch (error) {
      next(new ApiError(401, 'Invalid login credentials'));
    }
  };
}