import
{ GET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, EXPENSE_EDITED }
from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case ADD_EXPENSE:
  // Logica do requisito 4 construída com a ajuda de Taisa Ferreira e Daniel Gomes
    return {
      ...state,
      expenses: [...state.expenses,
        {
          id: state.expenses.length,
          ...action.expense,
          exchangeRates: action.exchangeRates,
        }],
      editor: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => (Number(expense.id) !== Number(action.id))),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case EXPENSE_EDITED:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

export default wallet;
