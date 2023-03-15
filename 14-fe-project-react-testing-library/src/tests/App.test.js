import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  it('1.1 O topo da aplicação contém um conjunto fixo de links de navegação:',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Favorite Pokémons/i }))
        .toBeInTheDocument();
    });

  it('1.2 A aplicação é redirecionada para URL /, ao clicar no link Home:',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });

      userEvent.click(homeLink);
      const { pathname } = history.location;

      expect(pathname).toBe('/');
    });

  it('1.3 A aplicação é redirecionada para URL /about, ao clicar no link About:',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /About/i });

      userEvent.click(aboutLink);
      const { pathname } = history.location;

      expect(pathname).toBe('/about');
    });

  it('1.4 A aplicação é redirecionada para URL /favorites, ao clicar no link FavPokemon:',
    () => {
      const { history } = renderWithRouter(<App />);
      const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

      userEvent.click(favLink);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });

  it('1.5 A aplicação vai para página Not Found ao entrar em uma URL desconhecida:',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/whatever');
      const notFoundHeader = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });

      expect(notFoundHeader).toBeInTheDocument();
    });
});
