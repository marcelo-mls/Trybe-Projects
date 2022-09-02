import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../Context/RecipeContext';

function HorizontalButtons(props) {
  const { index, foodObject, removeFavorite } = props;
  const { id, type } = foodObject;
  const [click, setClick] = useState(false);
  const [tagHtml, setTagHtml] = useState(false);
  const { toggleRefresh } = useContext(RecipeContext);
  useEffect(() => {
    setClick(true);
  }, []);

  const handleClick = () => {
    setTagHtml(!tagHtml);
    const foodType = type === 'drink' ? 'drinks' : 'foods';
    navigator.clipboard.writeText(`http://localhost:3000/${foodType}/${id}`);
  };

  function deleteItem() {
    const favoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRemoved = favoriteFood.filter((food) => food.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRemoved));
    toggleRefresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ shareIcon }
          alt="botão de compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      { !removeFavorite && (
        <button
          type="button"
          onClick={ () => deleteItem() }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ click ? blackHeartIcon : whiteHeartIcon }
            alt="botão de favoritar"
          />
        </button>
      )}
      <p>{ tagHtml && 'Link copied!'}</p>
    </div>
  );
}

HorizontalButtons.propTypes = {
  index: PropTypes.number,
  foodObject: PropTypes.shape({}),
}.isRequired;

export default HorizontalButtons;
