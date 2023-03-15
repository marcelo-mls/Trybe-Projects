export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EXPENSE_EDITED = 'EXPENSE_EDITED';

async function fetchAPI() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// <----- REQUISITO 1 ----->
export function addUser(payload) {
// payload aqui é uma string que armazena o email da pessoa usuária
  return {
    type: ADD_USER,
    payload,
  };
}

// <----- REQUISITO 3 ----->
export function getCurrencies(currencies) {
  return {
    type: GET_CURRENCIES,
    currencies,
  };
}

export function GetCurrenciesFromAPI() {
  return async (dispatch) => {
    const currencies = await fetchAPI();
    delete currencies.USDT;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    dispatch(getCurrencies(currencies));
  };
}

// <----- REQUISITO 4 - Refatorado ----->
// Logica do requisito 4 construída com a ajuda de Taisa Ferreira e Daniel Gomes
export function addExpense(localStateAndCurrencies) {
  return {
    type: ADD_EXPENSE,
    expense: localStateAndCurrencies.localState,
    exchangeRates: localStateAndCurrencies.currencies,
  };
}

export function getExchangeRatesFromAPI(localState) {
  return async (dispatch) => {
    const currencies = await fetchAPI();
    dispatch(addExpense({ localState, currencies }));
  };
}

// <----- REQUISITO 8 ----->
export function deleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    id,
  };
}

// <----- REQUISITO 9----->
export function editExpense(id) {
  return {
    type: EDIT_EXPENSE,
    id,
  };
}

export function expenseEdited(expenses) {
  return {
    type: EXPENSE_EDITED,
    expenses,
  };
}
