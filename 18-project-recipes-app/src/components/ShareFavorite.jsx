import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ShareFavorite(props) {
  const { foodObject } = props;
  const [tagHtml, setTagHtml] = useState(false);
  const [click, setClick] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const ID = foodObject.idMeal || foodObject.idDrink;
    if (favoriteRecipes) {
      const responseId = favoriteRecipes.find((foodId) => foodId.id === ID);
      if (responseId) {
        setClick(true);
      }
    }
  }, []);

  function createObject() {
    return {
      id: (foodObject.idMeal || foodObject.idDrink),
      type: (foodObject.idMeal ? 'food' : 'drink'),
      nationality: foodObject.strArea || '',
      category: foodObject.strCategory,
      alcoholicOrNot: foodObject.strAlcoholic || '',
      name: (foodObject.strMeal || foodObject.strDrink),
      image: foodObject.strMealThumb || foodObject.strDrinkThumb,
    };
  }

  const handleClick = () => {
    const TRINTA_E_TRES = 33;
    const TRINTA_E_CINCO = 35;
    setTagHtml(!tagHtml);
    if (history.location.pathname.includes('foods')) {
      const windowLink = (window.location.href);
      const link = windowLink.slice(0, TRINTA_E_TRES);
      navigator.clipboard.writeText(link);
    } else {
      const windowLink = (window.location.href);
      const link = windowLink.slice(0, TRINTA_E_CINCO);
      navigator.clipboard.writeText(link);
    }
  };

  const favoriteFood = () => {
    setClick(!click);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([createObject()]));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([createObject(), ...favoriteRecipes]));
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClick() }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="botão de compartilhar"
        />
      </button>
      <button
        type="button"
        onClick={ () => favoriteFood() }
      >
        <img
          data-testid="favorite-btn"
          src={ click ? blackHeartIcon : whiteHeartIcon }
          alt="botão de favoritar"
        />
      </button>

      <p>{ tagHtml && 'Link copied!'}</p>
    </div>

  );
}

ShareFavorite.propTypes = {
  foodObject: PropTypes.shape({}),
}.isRequired;

export default ShareFavorite;
