import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import Wallet from "../pages/Wallet";

describe('Valida o funcionamento da página WalletForm', () => {
  it('1 - Testa se os componentes da Página são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />);

    const { pathname } = history.location;
    const expenseButton = screen.getByRole('button', { name: /Adicionar despesa/i })
    const valueInput = screen.getByPlaceholderText(/Expense Value/i )
    const descriptionInput = screen.getByPlaceholderText(/description/i )
    const currencyInput = screen.getByTestId(/currency-input/i )
    const methodInput = screen.getByTestId(/method-input/i )
    const tagInput = screen.getByTestId(/tag-input/i )
  
    expect(pathname).toBe('/')
    expect(expenseButton).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  })
  

  it('2 - Testa se é possível digitar nos inputs e adicionar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input')
    const descriptionInput = screen.getByTestId('description-input')
    const expenseButton = screen.getByRole('button', { name: /Adicionar despesa/i })

    userEvent.type(valueInput, 100)
    userEvent.type(descriptionInput, 'Cem Dólares')

    expect(descriptionInput).toHaveValue('Cem Dólares');

    userEvent.click(expenseButton);

    const cellMethod = await screen.findByRole('cell', { name: 'Dinheiro',})
    const cellTag = await screen.findByRole('cell', { name: 'Alimentação',})
    const cellCoin = await screen.findByRole('cell', { name: 'Real',})
    const cellDescription = await screen.findByRole('cell', { name: 'Cem Dólares',})
    
    expect(cellDescription).toBeInTheDocument();
    expect(cellCoin).toBeInTheDocument();
    expect(cellTag).toBeInTheDocument();
    expect(cellMethod).toBeInTheDocument();

  })

})

// <------------ Modelo ------------->
// describe('Descrição do grupo', () => {
//   it('Descrição do teste', () => {

//   })
// })