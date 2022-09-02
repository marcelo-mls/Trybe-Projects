import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App'

describe('Valida o funcionamento da página de Login', () => {
  it('1 - Testa se os componentes da Página de Login são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    const loginButton = screen.getByRole('button', { name: /entrar/i })
    const emailInput = screen.getByPlaceholderText('email')
    const passwordInput = screen.getByPlaceholderText('password')
  
    expect(pathname).toBe('/')
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  })
  

  it('2 - Testa se é possível digitar nos inputs', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')

    userEvent.type(emailInput, 'algumacoisa@email.com')
    userEvent.type(passwordInput, '123456')

    expect(emailInput).toHaveValue('algumacoisa@email.com');
    expect(passwordInput).toHaveValue('123456');
  })

  it('3 - Testa se ao clicar no botão é redirecionado para Carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /entrar/i })
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')

    userEvent.type(emailInput, 'algumacoisa@email.com')
    userEvent.type(passwordInput, '123456')
    expect(loginButton).not.toBeDisabled();
    userEvent.click(loginButton)

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira')
  })

})

// <------------ Modelo ------------->
// describe('Descrição do grupo', () => {
//   it('Descrição do teste', () => {

//   })
// })