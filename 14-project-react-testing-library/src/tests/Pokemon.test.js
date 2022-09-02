import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('6. Teste o componente <Pokemon.js />', () => {
  const pokemonsIds = pokemons.map((pokemon) => pokemon.id);

  it('6.1 Teste se é renderizado um card com as informações de determinado pokémon:',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);

      const pokemonImage = screen.getByAltText(/Pikachu sprite/i);
      const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('src', src);
    });

  it('6.2 O card exibido tem um link com a URL /pokemons/<id> (<id> é o id do pokémon):',
    () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      const detailsLinks = screen.getByRole('link', { name: /More details/i });
      // pokemonsIds declarado globalmente
      pokemonsIds.forEach((id) => {
        expect(detailsLinks).toHaveAttribute('href', `/pokemons/${id}`);
        userEvent.click(nextPokemonButton);
      });
    });

  it('6.3 Ao clicar no link, é feito o redirecionamento para a página de detalhes:',
    () => {
      renderWithRouter(<App />);
      const detailsLinks = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLinks);

      const subHeaders = screen.getAllByRole('heading', { level: 2 });

      expect(detailsLinks).not.toBeInTheDocument();
      expect(subHeaders[0]).toHaveTextContent(/Details/i);
      expect(subHeaders[1]).toHaveTextContent(/Summary/i);
      expect(subHeaders[2]).toHaveTextContent(/Game Locations of/i);
    });

  it('6.4 A URL exibida no navegador muda para /pokemon/<id>, (<id> é o id do pokémon):',
    () => {
      const { history } = renderWithRouter(<App />);

      const detailsLinks = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLinks);

      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pokemonsIds[0]}`);
    });

  it('6.5 Teste se existe um ícone de estrela nos pokémons favoritados:',
    () => {
      const { history } = renderWithRouter(<App />);
      const detailsLinks = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLinks);

      const checkbox = screen.getByRole('checkbox');
      userEvent.click(checkbox);
      history.push('/');

      const starImage = screen.getAllByRole('img');
      expect(starImage[1]).toHaveAttribute('src', '/star-icon.svg');
      expect(starImage[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    });
});
