// Logica do requisito 4 construída com a ajuda de Taisa Ferreira e Daniel Gomes

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import
{ GetCurrenciesFromAPI, getExchangeRatesFromAPI, expenseEdited }
from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.callDispatches('currencies');
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  callDispatches = async (dispatch) => {
    const { dispatchCurrencies, dispatchExchangeRates } = this.props;
    if (dispatch === 'currencies') {
      await dispatchCurrencies();
    }
    if (dispatch === 'rates') {
      await dispatchExchangeRates(this.state);
    }
  }

  clearFormInputs = () => {
    this.setState({
      value: '',
      description: '',
    });
  }

  AddExpense = () => {
    this.callDispatches('rates');
    this.clearFormInputs();
  }

  EditExpense = () => {
    const {
      getIdToEditFromStore,
      getExpensesFromStore,
      dispatchExpenseEdited,
    } = this.props;

    const expensesCopy = [...getExpensesFromStore];

    expensesCopy.forEach((expense) => {
      if (Number(expense.id) === Number(getIdToEditFromStore)) {
        const { value, description, currency, method, tag } = this.state;
        expense.value = value;
        expense.description = description;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
      }
    });
    dispatchExpenseEdited(expensesCopy);
  }

  handleClick = () => {
    const { getEditorStatusFromStore } = this.props;

    if (!getEditorStatusFromStore) {
      this.AddExpense();
    }
    if (getEditorStatusFromStore) {
      this.EditExpense();
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { getCurrenciesFromStore, getEditorStatusFromStore } = this.props;
    return (
      <div>
        <fieldset>
          <legend>WalletForm</legend>
          <input
            type="number"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
            placeholder="Expense Value"
          />
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
            placeholder="Description"
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {getCurrenciesFromStore.map((currencyName) => (
              <option
                key={ currencyName }
              >
                {currencyName}
              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            {getEditorStatusFromStore ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </fieldset>
      </div>
    );
  }
}

WalletForm.propTypes = {
  getCurrenciesFromStore: PropTypes.arrayOf(PropTypes.string),
  dispatchCurrencies: PropTypes.func,
  dispatchExchangeRates: PropTypes.func,
  getEditorStatusFromStore: PropTypes.bool,
  getIdToEditFromStore: PropTypes.number,
  getExpensesFromStore: PropTypes.arrayOf(PropTypes.object),
  dispatchExpenseEdited: PropTypes.func,
}.isRequired;

function mapStateToProps(state) {
  return {
    getCurrenciesFromStore: state.wallet.currencies,
    getEditorStatusFromStore: state.wallet.editor,
    getIdToEditFromStore: state.wallet.idToEdit,
    getExpensesFromStore: state.wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCurrencies: () => dispatch(GetCurrenciesFromAPI()),
    dispatchExchangeRates: (localState) => dispatch(getExchangeRatesFromAPI(localState)),
    dispatchExpenseEdited: (expenses) => dispatch(expenseEdited(expenses)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
