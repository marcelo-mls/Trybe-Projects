export interface IUser {
  id?: number;
  username?: string;
  role?: string;
  email: string;
  password: string;
}

export interface IResult {
  status: number;
  message: string | object | null;
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}

export interface ILeaderBoard {
  id: number
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
