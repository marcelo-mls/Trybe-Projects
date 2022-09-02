import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleClickDelete = (event) => {
    const { id } = event.target;
    const { dispatchIdToDeleteExpense } = this.props;
    dispatchIdToDeleteExpense(id);
  }

  handleClickEdit = (event) => {
    const { id } = event.target;
    const { dispatchIdToEditExpense } = this.props;
    dispatchIdToEditExpense(id);
  }

  render() {
    const { getExpensesFromStore } = this.props;
    return (
      <fieldset>
        <legend>Table</legend>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              getExpensesFromStore.map((expense, index) => {
                const { exchangeRates, currency, value } = expense;
                return (
                  <tr key={ index }>
                    <td>{ expense.description }</td>
                    <td>{ expense.tag }</td>
                    <td>{ expense.method }</td>
                    <td>{ Number(expense.value).toFixed(2) }</td>
                    <td>{ exchangeRates[currency].name }</td>
                    <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                    <td>
                      { (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2) }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        id={ expense.id }
                        type="button"
                        data-testid="edit-btn"
                        onClick={ this.handleClickEdit }
                      >
                        Editar
                      </button>
                      <button
                        key={ expense.id }
                        id={ expense.id }
                        type="button"
                        data-testid="delete-btn"
                        onClick={ this.handleClickDelete }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </fieldset>
    );
  }
}

Table.propTypes = {
  getExpensesFromStore: PropTypes.arrayOf(PropTypes.string),
  dispatchIdToDeleteExpense: PropTypes.func,
  dispatchIdToEditExpense: PropTypes.func,
}.isRequired;

function mapStateToProps(state) {
  return {
    getExpensesFromStore: state.wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchIdToDeleteExpense: (id) => dispatch(deleteExpense(id)),
    dispatchIdToEditExpense: (id) => dispatch(editExpense(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// Clicar em editar - alterar o estadoGlobal de edição para True.

// Dentro do botão de salvar.. criar um IF.. se o estadoGlobal de edição for false.. o botão salva.. se for true o mesmo botão salva a edição.

// salvar o ID do botão que esta sendo editado no estado global.

// ao clicar em salvar.. usar o id para procurar a posição da expense que foi editada e substituir as informação.
