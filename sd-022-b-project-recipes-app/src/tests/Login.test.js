import React from 'react';
import Login from '../pages/Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/RenderWithRouter';


describe('Testes da página de login', () => {
  it('Verifica se o input de email é renderizado', () => {
    render(<Login />)
    const inputEmail = screen.getByTestId("email-input");
    expect(inputEmail.type).toBe("email");
    expect(inputEmail).toBeInTheDocument();
  })

  it('Verifica se o input de senha é renderizado', () => {
    render(<Login />)
    const inputPassword = screen.getByTestId("password-input");
    expect(inputPassword.type).toBe("password");
    expect(inputPassword).toBeInTheDocument();
  })

  it('Verifica se o botão de Entrar inicia desabilitado', () => {
    render(<Login />)
    const button = screen.getByTestId("login-submit-btn");
    expect(button).toHaveProperty('disabled', true);
  })

  it('Verifica se o botão de Entrar permanece desabilitado com email e senha inválidos', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId("email-input");
    const inputPassword = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-submit-btn");

    userEvent.type(inputEmail, 'teste2teste.com');
    userEvent.type(inputPassword, 'tribi');
    expect(button).toHaveProperty('disabled', true);
  })

  it('Verifica se o botão de Entrar é habilitado com email e senha válidos', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId("email-input");
    const inputPassword = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-submit-btn");

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, 'password');
    expect(button).toHaveProperty('disabled', false);
  })

  it('Verifica se ao clicar em Entrar é redirecionado para a página /foods', () => {
    const { history } = renderWithRouter(<Login />)
    const inputEmail = screen.getByTestId("email-input");
    const inputPassword = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-submit-btn");

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, 'password');
    expect(button).toHaveProperty('disabled', false);

    userEvent.click(button)

    const { pathname } = history.location
    expect (pathname).toBe('/foods')
  })

})
