import { IResult, IMatch, ITeam, ILeaderBoard } from '../Utils/Interfaces';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import statusCode from '../Utils/errorMap';

export default class LeaderBoardService {
  private _leaderBoard: ILeaderBoard[];
  private _matches: IMatch[];

  constructor(private _teamModel = Teams, private _matchModel = Matches) {
    this._leaderBoard = [];
    this._matches = [];
  }

  // função principal
  getHome = async (): Promise<IResult> => {
    await this.findMatches(); // busca partidas
    await this.createLeaderBoard(); // inicializa do placar
    await this.fillLeaderBoard(); // preenche o placar

    return { status: statusCode.ok, message: this._leaderBoard };
  };

  // inicializador do placar
  private createLeaderBoard = async (): Promise<void> => {
    const teams = await this._teamModel.findAll();

    const leaderBoard = teams.map((team: ITeam) => (
      {
        id: team.id,
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: '',
      }
    ));

    this._leaderBoard = leaderBoard;
  };

  // busca e preenche atributo de partidas
  private findMatches = async (): Promise<void> => {
    const result = await this._matchModel.findAll({ where: { inProgress: false } });

    this._matches = result;
  };

  // filtra todas as partidas de um único time
  private filterMatches = (teamId: number): IMatch[] => {
    const result = this._matches.filter((match) => match.homeTeam === teamId); // filtra apenas os times HOME

    return result;
  };

  private defineResult = (index: number, match: IMatch): void => {
    if (match.homeTeamGoals > match.awayTeamGoals) { // vitoria
      this._leaderBoard[index].totalPoints += 3;
      this._leaderBoard[index].totalVictories += 1;
      this._leaderBoard[index].goalsFavor += match.homeTeamGoals;
      this._leaderBoard[index].goalsOwn += match.awayTeamGoals;
    }

    if (match.homeTeamGoals === match.awayTeamGoals) { // empate
      this._leaderBoard[index].totalPoints += 1;
      this._leaderBoard[index].totalDraws += 1;
      this._leaderBoard[index].goalsFavor += match.homeTeamGoals;
      this._leaderBoard[index].goalsOwn += match.awayTeamGoals;
    }

    if (match.homeTeamGoals < match.awayTeamGoals) { // derrota
      this._leaderBoard[index].totalLosses += 1;
      this._leaderBoard[index].goalsFavor += match.homeTeamGoals;
      this._leaderBoard[index].goalsOwn += match.awayTeamGoals;
    }
  };

  // preenche o placar
  private fillLeaderBoard = async (): Promise<void> => {
    // percorre o placar
    this._leaderBoard.forEach(async (team, index) => {
      // filtra todas as partidas de um único time
      const matches = this.filterMatches(team.id);
      this._leaderBoard[index].totalGames = matches.length;

      // percorre as partidas
      matches.forEach(async (match) => this.defineResult(index, match));

      // Edita métricas consolidadas
      const goalsBalance = this._leaderBoard[index].goalsFavor - this._leaderBoard[index].goalsOwn;
      const efficiency = (this._leaderBoard[index].totalPoints / (matches.length * 3)) * 100;

      this._leaderBoard[index].goalsBalance = goalsBalance;
      this._leaderBoard[index].efficiency = String(efficiency.toFixed(2));
    });

    // ordena o placar
    this._leaderBoard.sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints
      || teamB.totalVictories - teamA.totalVictories
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
      || teamA.goalsOwn - teamB.goalsOwn);
  };
}
