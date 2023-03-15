import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App'; // Pokedex fica na home
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('5.1 Teste se a página contém um heading h2 com o texto Encountered pokémons:',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('heading', {
        name: /Encountered pokémons/i,
        level: 2,
      })).toBeInTheDocument();
    });

  it('5.2 É exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado:',
    () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      const actualPokemon = screen.getByTestId(/pokemon-name/i);

      expect(actualPokemon).toHaveTextContent(/Pikachu/i);

      userEvent.click(nextPokemonButton);

      expect(actualPokemon).not.toHaveTextContent(/Pikachu/i);
      expect(nextPokemonButton).toBeInTheDocument();
    });

  it('5.3 Teste se é mostrado apenas um pokémon por vez:',
    () => {
      renderWithRouter(<App />);
      expect(screen.getAllByRole('img')).toHaveLength(1);
      expect(screen.getAllByTestId(/pokemon-name/i)).toHaveLength(1);
    });

  it('5.4 Teste se a Pokédex tem os botões de filtro:',
    () => {
      renderWithRouter(<App />);
      const allPokemonsTypes = pokemons.map((pokemon) => pokemon.type);
      const uniquePokemonsTypes = [...new Set(allPokemonsTypes)];
      const SEVEN = uniquePokemonsTypes.length;

      // Verifica se quantidade de buttons de tipo, correspondem a número de tipos.
      const allTypeButtons = screen.getAllByTestId(/pokemon-type-button/i);
      expect(allTypeButtons).toHaveLength(SEVEN);

      // Verifica se pra cada tipo, existe um button exibindo o nome do tipo.
      uniquePokemonsTypes.forEach((type, index) => {
        expect(allTypeButtons[index]).toHaveTextContent(type);
      });
    });

  it('5.5 Teste se a Pokédex contém um botão para resetar o filtro:',
    () => {
      renderWithRouter(<App />);
      const allPokemonsButton = screen.getByRole('button', { name: /All/i });
      userEvent.click(allPokemonsButton);
    });
});
