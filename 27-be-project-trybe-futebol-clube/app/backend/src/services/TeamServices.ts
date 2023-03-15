import { IResult } from '../Utils/Interfaces';
import Teams from '../database/models/Teams';
import statusCode from '../Utils/errorMap';

export default class TeamService {
  constructor(
    private _teamModel = Teams,
  ) {}

  getTeams = async (): Promise<IResult> => {
    const result = await this._teamModel.findAll();

    return { status: statusCode.ok, message: result };
  };

  getTeamById = async (id: number | string): Promise<IResult> => {
    if (!id) {
      return { status: statusCode.badRequest, message: { message: 'Bad Request' } };
    }

    const result = await this._teamModel.findByPk(id);

    return { status: statusCode.ok, message: result };
  };
}
