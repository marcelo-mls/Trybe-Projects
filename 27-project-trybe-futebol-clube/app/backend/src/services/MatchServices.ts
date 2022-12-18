import { IMatch, IResult } from '../Utils/Interfaces';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import statusCode from '../Utils/errorMap';

export default class MatchesService {
  constructor(
    private _matchesModel = Matches,
  ) {}

  getMatches = async (): Promise<IResult> => {
    const result = await this._matchesModel.findAll(
      {
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    return { status: statusCode.ok, message: result };
  };

  getMatchesByQuery = async (query: string): Promise<IResult> => {
    const inProgress = query === 'true';

    const result = await this._matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return { status: statusCode.ok, message: result };
  };

  postMatch = async (match: IMatch): Promise<IResult> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

    if (homeTeam === awayTeam) {
      return { status: statusCode.unprocessableEntity,
        message: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const getHomeTeam = await this._matchesModel.findByPk(homeTeam);
    const getAwayTeam = await this._matchesModel.findByPk(awayTeam);

    if (!getHomeTeam || !getAwayTeam) {
      return { status: statusCode.notFound,
        message: { message: 'There is no team with such id!' },
      };
    }

    const result = await this._matchesModel.create(
      { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true },
    );

    return { status: statusCode.created, message: result };
  };

  patchMatch = async (id: string): Promise<IResult> => {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });

    return { status: statusCode.ok, message: { message: 'Finished' } };
  };

  patchMatchWithBody = async (
    id: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ): Promise<IResult> => {
    await this._matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { status: statusCode.ok, message: { message: 'Finished' } };
  };
}
