import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('7.1 As informações detalhadas do pokémon selecionado são mostradas na tela:',
    () => {
      renderWithRouter(<App />);
      const detailsLinks = screen.getByRole('link', { name: /More details/i });

      userEvent.click(detailsLinks);

      const firstH2 = screen.getByRole('heading', { name: /Pikachu Details/i });
      const secondH2 = screen.getByRole('heading', { name: /Summary/i });
      const thirdH2 = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
      const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);

      expect(firstH2).toBeInTheDocument();
      expect(secondH2).toBeInTheDocument();
      expect(thirdH2).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
    });

  it('7.2 Existe na página uma seção com os mapas contendo as localizações do pokémon:',
    () => {
      renderWithRouter(<App />);
      const detailsLinks = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLinks);

      const allPokemonsLocations = pokemons.map((pokemon) => pokemon.foundAt);
      const DOIS = allPokemonsLocations[0].length;
      const src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

      const pokemonLocations = screen.getAllByAltText(/Pikachu location/i);

      expect(pokemonLocations).toHaveLength(DOIS);
      expect(pokemonLocations[0]).toHaveAttribute('src', src);
    });

  it('7.3 Teste se o usuário pode favoritar um pokémon através da página de detalhes:',
    () => {
      renderWithRouter(<App />);
      const detailsLinks = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLinks);

      const checkbox = screen.getByLabelText(/Pokémon favoritado/i);
      expect(checkbox).toBeInTheDocument();
    });
});
