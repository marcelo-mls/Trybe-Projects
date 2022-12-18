import { Request, Response } from 'express';
import UserService from '../services/UserServices';

export default class UserController {
  constructor(
    private _service = new UserService(),
  ) {}

  postLogin = async (req: Request, res: Response) => {
    const result = await this._service.postLogin(req.body);

    const { status, message } = result;

    res.status(status).json(message);
  };

  getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (authorization) {
      const result = await this._service.getRole(authorization);
      const { status, message } = result;

      res.status(status).json(message);
    }
  };
}
