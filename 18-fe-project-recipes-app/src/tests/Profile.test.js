import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/RenderWithRouter';

function checkUrl(url, history) {
  let { pathname } = history.location;
  expect(pathname).toBe(`/${url}`);
}

describe('pagina profile', () => {
it('botao done', () => {
  const {history} = renderWithRouter(<App />);
  const emailInput = 'teste@email.com';
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const btn = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(email, emailInput);
  userEvent.type(senha, '1234567');
  userEvent.click(btn)

  history.push('/profile')

        const btnDone = screen.getByTestId('profile-done-btn');
        expect(btnDone).toBeInTheDocument();
        userEvent.click(btnDone);
        checkUrl('done-recipes', history);  
})
it('botao favorite', () => {
  const {history} = renderWithRouter(<App />);
  const emailInput = 'teste@email.com';
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const btn = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(email, emailInput);
  userEvent.type(senha, '1234567');
  userEvent.click(btn)
 
  history.push('/profile')

  const btnFavorite = screen.getByTestId('profile-favorite-btn');
  expect(btnFavorite).toBeInTheDocument();
  userEvent.click(btnFavorite);    
         
  checkUrl('favorite-recipes', history);
})
it('botao logout', () => {
  const {history} = renderWithRouter(<App />);
  const emailInput = 'teste@email.com';
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const btn = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(email, emailInput);
  userEvent.type(senha, '1234567');
  userEvent.click(btn)
 
  history.push('/profile')
  const btnLogout = screen.getByTestId('profile-logout-btn');
           expect(btnLogout).toBeInTheDocument();
           userEvent.click(btnLogout);    
  
           checkUrl('/', history);
})
});