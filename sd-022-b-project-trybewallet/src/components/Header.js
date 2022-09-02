// Logica do requisito 4 construída com a ajuda de Taisa Ferreira e Daniel Gomes

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  setTotalExpense = () => {
    const { getExpensesFromStore } = this.props;

    const totalExpense = getExpensesFromStore.reduce((acc, curr) => {
      const { currency, exchangeRates, value } = curr;
      return acc + (Number(exchangeRates[currency].ask) * Number(value));
    }, 0);

    return totalExpense.toFixed(2);
  }

  render() {
    const { getUserEmailFromStore } = this.props;
    return (
      <div>
        <p>descrição das despesas</p>
        <fieldset>
          <legend>Header</legend>
          <p data-testid="email-field">{getUserEmailFromStore}</p>
          <strong>
            <span data-testid="total-field">{ this.setTotalExpense() }</span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </strong>
        </fieldset>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getUserEmailFromStore: state.user.email,
    getExpensesFromStore: state.wallet.expenses,
  };
}

Header.propTypes = {
  getUserEmailFromStore: PropTypes.string,
  getExpensesFromStore: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps)(Header);
