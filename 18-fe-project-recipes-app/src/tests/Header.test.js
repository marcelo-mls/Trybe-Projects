import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './utils/RenderWithRouter'
import App from '../App'
import Header from '../components/Header';

describe('Testando component Header', () => {
  it('Testando se o Header Aparece na tela', () => {
    RenderWithRouter(<Header title="App" />);
    const appTitle = screen.getByRole('heading', {
      name: /App/i
    })
    expect(appTitle).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão da barra de pesquisa a Search Bar aparecerá na tela', () => {
    RenderWithRouter(<Header title="App" />);
    const profileButton = screen.getByTestId('search-top-btn')
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('Se ao clicar no botão de perfil a pagina muda para rota "/profile" ', () => {
    const { history } = RenderWithRouter(<App title="App" />);
    history.push('/foods')

    const profileButton = screen.getByTestId('profile-top-btn')
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
    
    const searchInput = screen.getByRole('heading', {
      name: /profile/i
    })
    expect(searchInput).toBeInTheDocument();
  });
})
