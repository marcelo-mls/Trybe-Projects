import { Request, Response } from 'express';
import TeamsService from '../services/TeamServices';

export default class TeamController {
  constructor(
    private _service = new TeamsService(),
  ) {}

  getTeams = async (req: Request, res: Response) => {
    const result = await this._service.getTeams();

    const { status, message } = result;

    res.status(status).json(message);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this._service.getTeamById(id);

    const { status, message } = result;

    res.status(status).json(message);
  };
}
