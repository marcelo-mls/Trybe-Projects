import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// import App from '../App';
import Feedback from "../pages/Feedback";

describe('Testando a página Feedback', () => {
  test('os componentes renderizam na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    const buttonRanking = screen.getByTestId('btn-ranking');

    expect(buttonPlayAgain).toBeInTheDocument();
    expect(buttonRanking).toBeInTheDocument();
  });

  test('o funcionamento dos botões', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    const buttonRanking = screen.getByTestId('btn-ranking');

    userEvent.click(buttonPlayAgain);
    userEvent.click(buttonRanking);
  });
});