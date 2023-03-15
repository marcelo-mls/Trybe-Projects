export const loginMock = {
  email: 'string@string.com',
  password: 'stringnumber'
}

export const userMock = {
  id: 1,
  username: 'string string string',
  role: 'string',
  email: 'string@string.com',
  password: 'stringnumber',
}

export const teamsMock = [
  { "id": 1, "teamName": "Avaí/Kindermann" },
  {"id": 2, "teamName": "Bahia" },
  { "id": 3, "teamName": "Botafogo" }
]

export const matchesMock = [
  {
    "id": 40,
    "homeTeam": 12,
    "homeTeamGoals": 4,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": { "teamName": "Palmeiras" },
    "teamAway": { "teamName": "Grêmio" }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": { "teamName": "São Paulo" },
    "teamAway": { "teamName": "Internacional" }
  }
]