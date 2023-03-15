import { Request, Response } from 'express';
import MatchesService from '../services/MatchServices';

export default class MatchController {
  constructor(
    private _service = new MatchesService(),
  ) {}

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      const result = await this._service.getMatchesByQuery(inProgress as string);
      const { status, message } = result;

      return res.status(status).json(message);
    }

    const result = await this._service.getMatches();
    const { status, message } = result;

    res.status(status).json(message);
  };

  postMatch = async (req: Request, res: Response) => {
    const result = await this._service.postMatch(req.body);

    const { status, message } = result;

    res.status(status).json(message);
  };

  patchMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this._service.patchMatch(id);

    const { status, message } = result;

    res.status(status).json(message);
  };

  patchMatchWithBody = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const result = await this._service.patchMatchWithBody(id, homeTeamGoals, awayTeamGoals);

    const { status, message } = result;

    res.status(status).json(message);
  };
}
