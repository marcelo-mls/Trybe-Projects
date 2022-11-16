import { Request, Response } from 'express';
import statusCodes from '../utils/errorMap';
import UserService from '../services/user.services';

class UserController {
  public userService = new UserService();

  public async insertUser(req: Request, res: Response) {
    const user = req.body;
    const token = await this.userService.insertUser(user);

    res.status(statusCodes.CREATED).json({ token });
  }
}

export default UserController;
