import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('3.1 É exibida \'No favorite pokemon found\', caso não tenha pokémons favoritos:',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ [] } />);
      expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    });

  it('3.2 Teste se são exibidos todos os cards de pokémons favoritados.:',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

      pokemons.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      });
    });
});
