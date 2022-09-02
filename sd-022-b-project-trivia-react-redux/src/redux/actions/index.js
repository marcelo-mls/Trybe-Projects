export const LOGIN = 'LOGIN';
export const ADD_USER = 'ADD_USER';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const CLEAR_SCORE = 'CLEAR_SCORE';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const addAssertions = (payload) => ({
  type: ADD_ASSERTIONS,
  payload,
});

export const clearScore = () => ({
  type: CLEAR_SCORE,
});
