import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Ingredients from './Ingredients';
import ShareFavorite from './ShareFavorite';
import RecipeContext from '../Context/RecipeContext';

function RecipesInProgress(props) {
  const { title, image, category, instructions, foodObject, history } = props;
  const { verifyButton } = useContext(RecipeContext);

  function dataAtualFormatada() {
    return (new Date().toLocaleDateString());
  }

  function handleLocalStorage() {
    const doneRecipes = {
      id: (foodObject.idMeal || foodObject.idDrink),
      type: (foodObject.idMeal ? 'food' : 'drink'),
      nationality: foodObject.strArea || '',
      category: foodObject.strCategory,
      alcoholicOrNot: foodObject.strAlcoholic || '',
      name: (foodObject.strMeal || foodObject.strDrink),
      image: foodObject.strMealThumb || foodObject.strDrinkThumb,
      doneDate: dataAtualFormatada(),
      tags: foodObject.strTags ? foodObject.strTags.split(',') : [],
    };

    const ItemsFromStorage = localStorage.getItem('doneRecipes');
    const recipesStorage = JSON.parse(ItemsFromStorage) === null
      ? []
      : JSON.parse(ItemsFromStorage);

    localStorage.setItem('doneRecipes', JSON.stringify([...recipesStorage, doneRecipes]));
    history.push('/done-recipes');
  }

  return (
    <fieldset>
      <legend data-testid="recipe-title">
        {title}
      </legend>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ `foto e receita de ${title} ` }
        style={ { width: '200px', height: '200px' } }
      />
      <ShareFavorite foodObject={ foodObject } />
      <h3 data-testid="recipe-category">{category}</h3>
      <Ingredients foodObject={ foodObject } testId="ingredient-step" checkbox />
      <p data-testid="instructions">{instructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ verifyButton }
        onClick={ handleLocalStorage }
      >
        Finalizar
      </button>
    </fieldset>
  );
}

RecipesInProgress.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default RecipesInProgress;
