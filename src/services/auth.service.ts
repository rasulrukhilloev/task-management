import { UserModel, IUser } from '../models/user.model';
import { ApiError } from '../utils/apiError.utils';

export class AuthService {
  async register(userData: Partial<IUser>): Promise<{ user: IUser; token: string }> {
    const user = new UserModel(userData);
    await user.save();
    const token = await user.generateAuthToken();
    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await UserModel.findByCredentials(email, password);
    if (!user) {
      throw new ApiError(401, 'Invalid login credentials');
    }
    const token = await user.generateAuthToken();
    return { user, token };
  }
}