import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  function redirect(route) {
    history.push(`/${route}`);
  }

  return (
    <fieldset data-testid="footer" className="footer">
      <legend>
        Footer
      </legend>
      <button type="button" onClick={ () => redirect('drinks') }>
        <img src={ drinkIcon } alt="Ícone de drink" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ () => redirect('foods') }>
        <img src={ mealIcon } alt="Ícone de drink" data-testid="food-bottom-btn" />
      </button>
    </fieldset>
  );
}

export default Footer;
