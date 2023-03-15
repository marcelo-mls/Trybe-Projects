import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockAPI from './mock';
import StarWarsProvider from '../context/StarWarsProvider';

// Testes realizados com a total ajuda do Daniel Gomes
describe('Testes do App', () => {
  it('I am your test', () => {
    render(<App />);
    const linkElement = screen.getByText(/Project Star Wars Planets Search/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('Testa filter name', async () => {
    global.fetch = jest.fn(
      (url) => Promise.resolve({
        json: () => Promise.resolve(mockAPI),
      }),
    );
    render(<App />);

    const planetTatooine = await screen.findByText(/Tatooine/i);
    const nameInput = await screen.findByTestId('name-filter');

    expect(planetTatooine).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    userEvent.type(nameInput, 'Alderaan');

    expect(planetTatooine).not.toBeInTheDocument();
  });

  it('Testa Maior que', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    render(<StarWarsProvider><App /></StarWarsProvider>);

    const columnFilter = await screen.findByTestId('column-filter');
    userEvent.selectOptions(columnFilter, 'orbital_period');

    const comparisonFilter = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'maior que');

    const valueFilter = await screen.findByTestId('value-filter');
    userEvent.type(valueFilter, '4000');

    const filterButton = await screen.findByTestId('button-filter');
    userEvent.click(filterButton);

    const planetYavin = await screen.findByText(/Yavin/i);
    const planetBespin = await screen.findByText(/Bespin/i);

    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(planetYavin).toBeInTheDocument();
    expect(planetBespin).toBeInTheDocument();
  });

  it('Testa Menor que', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    render(<StarWarsProvider><App /></StarWarsProvider>);

    const columnFilter = await screen.findByTestId('column-filter');
    userEvent.selectOptions(columnFilter, 'diameter');

    const comparisonFilter = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'menor que');

    const valueFilter = await screen.findByTestId('value-filter');
    userEvent.type(valueFilter, '5000');

    const filterButton = await screen.findByTestId('button-filter');
    userEvent.click(filterButton);

    const planetEndor = await screen.findByText(/Endor/i);
    expect(planetEndor).toBeInTheDocument();
  });

  it('Testa igual A', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    render(<StarWarsProvider><App /></StarWarsProvider>);

    const columnFilter = await screen.findByTestId('column-filter');
    userEvent.selectOptions(columnFilter, 'surface_water');

    const comparisonFilter = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'igual a');

    const valueFilter = await screen.findByTestId('value-filter');
    userEvent.type(valueFilter, '1');

    const filterButton = await screen.findByTestId('button-filter');
    userEvent.click(filterButton);

    const planetTatooine = await screen.findByText(/Tatooine/i);
    expect(planetTatooine).toBeInTheDocument();
  });
});
