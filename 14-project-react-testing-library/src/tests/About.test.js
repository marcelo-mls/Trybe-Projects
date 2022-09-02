import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('2. Teste o componente <About.js />', () => {
  it('2.1 Teste se a página contém um heading h2 com o texto About Pokédex:',
    () => {
      renderWithRouter(<About />);
      expect(screen.getByRole('heading', { name: /About Pokédex/i, level: 2 }))
        .toBeInTheDocument();
    });

  it('2.2 Teste se a página contém dois parágrafos com texto sobre a Pokédex:',
    () => {
      renderWithRouter(<About />);
      const firstP = screen.getByText(/This application simulates a Pokédex,/i);
      const secondP = screen.getByText(/One can filter Pokémons by type,/i);

      expect(firstP).toBeInTheDocument();
      expect(secondP).toBeInTheDocument();
    });

  it('2.3 Teste se a página contém a seguinte imagem de uma Pokédex:',
    () => {
      renderWithRouter(<About />);
      const image = screen.getByRole('img');
      const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

      expect(image).toHaveAttribute('src', src);
    });
});
