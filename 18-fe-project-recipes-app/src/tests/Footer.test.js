import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Footer from '../components/Footer';
import renderWithRouter from './utils/RenderWithRouter';

function checkUrl(url, history) {
  let { pathname } = history.location;
  expect(pathname).toBe(`/${url}`);
}

describe('Testando componente Footer', () => {
  it('Testando se o Footer Aparece na tela', () => {
    renderWithRouter(<Footer />);
    const drinkImage = screen.getByTestId('drinks-bottom-btn');
    expect(drinkImage).toBeInTheDocument();
  })

  it('Testando se os botões funcionam ', () => {
    const { history } = renderWithRouter(<App title="App" />);
    history.push('/foods')

    const drinkImage = screen.getByTestId('drinks-bottom-btn');
    expect(drinkImage).toBeInTheDocument();
    userEvent.click(drinkImage);

    checkUrl('drinks', history);

    const foodsImage = screen.getByTestId('food-bottom-btn');
    expect(foodsImage).toBeInTheDocument();
    userEvent.click(foodsImage);

    checkUrl('foods', history);
  });
})