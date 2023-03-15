import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardServices';

export default class LeaderBoardControllers {
  constructor(
    private _service = new LeaderBoardService(),
  ) {}

  getHome = async (req: Request, res: Response) => {
    const result = await this._service.getHome();

    const { status, message } = result;

    res.status(status).json(message);
  };
}
