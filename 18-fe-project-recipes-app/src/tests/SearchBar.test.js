import React from 'react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter'
import { mockMealsAPI, mockDrinksAPI, mockMealHaddock } from './utils/Mocks';
import { act } from 'react-dom/test-utils';

describe('Testa o funcionamento do componente SearchBar', () => {
  it('Verifica se o input de pesquisa é renderizado na página de Foods', () => {
    const { history } = RenderWithRouter(<App title="App" />);
    history.push('/foods')

    const profileButton = screen.getByTestId('search-top-btn')
    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument()
  })

  it('Verifica se o input de pesquisa é renderizado na página de Drinks', () => {
    const { history } = RenderWithRouter(<App title="App" />);
    history.push('/drinks')

    const profileButton = screen.getByTestId('search-top-btn')
    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument()
  })

  test('Verifica se a API é retornada corretamente ao pesquisar por um ingrediente de comida', async () => {
    const { history } = RenderWithRouter(<App title="App" />);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsAPI)
    });

    history.push('/foods')

    const profileButton = screen.getByTestId('search-top-btn')
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton)

    const search = screen.getByTestId('search-input');
    expect(search).toBeInTheDocument();
    userEvent.type(search, 'eggs')

    const nameInput = screen.getByTestId('ingredient-search-radio')
    userEvent.click(nameInput)

    const buttonSearch = screen.getByTestId('exec-search-btn')
    fireEvent.click(buttonSearch)

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=eggs'))
  });

  test('Verifica se a API é retornada corretamente ao pesquisar por um ingrediente de bebida', async () => {
    const { history } = RenderWithRouter(<App title="App" />);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksAPI)
    });

    history.push('/drinks')

    const profileButton = screen.getByTestId('search-top-btn')
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton)

    const search = screen.getByTestId('search-input');
    expect(search).toBeInTheDocument();
    userEvent.type(search, 'lemon')

    const nameInput = screen.getByTestId('ingredient-search-radio')
    userEvent.click(nameInput)

    const buttonSearch = screen.getByTestId('exec-search-btn')
    fireEvent.click(buttonSearch)

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon'))
  });

  test('Verificar se é exibido um alerta ao digitar mais de dois caracteres e selecionar o "First Letter"', () => {
    global.alert = jest.fn()
    .mockImplementationOnce(() => 'first call')
    
    const { history } = RenderWithRouter(<App title="App" />);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsAPI)
    });

    history.push('/foods')

    act(() => {
      const profileButton = screen.getByTestId('search-top-btn')
      expect(profileButton).toBeInTheDocument();
      userEvent.click(profileButton)
    })

    act(() => {
      const search = screen.getByTestId('search-input');
      expect(search).toBeInTheDocument();
      userEvent.type(search, 'zz')
    })

    act(() => {
      const firstLetter = screen.getByTestId('first-letter-search-radio')
      userEvent.click(firstLetter)
    })

    act(() => {
      const buttonSearch = screen.getByTestId('exec-search-btn')
      fireEvent.click(buttonSearch)
    })

    expect(global.alert).toBeCalled()
  })
  
  test('Verifica se é redirecionado ao encontrar apenas uma comida', async () => {
    const { history } = RenderWithRouter(<App title="App" />);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealHaddock)
    });

    history.push('/foods')

    const profileButton = screen.getByTestId('search-top-btn')
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton)

    const search = screen.getByTestId('search-input');
    expect(search).toBeInTheDocument();
    userEvent.type(search, 'Haddock')

    const nameInput = screen.getByTestId('ingredient-search-radio')
    userEvent.click(nameInput)

    const buttonSearch = screen.getByTestId('exec-search-btn')
    fireEvent.click(buttonSearch)

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Haddock'))

    const { pathname } = history.location;
    expect(pathname).toBe('/foods/53043')
  });
})