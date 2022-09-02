import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ShareFavorite from '../components/ShareFavorite';
import { fetchById, fetchFoodsList } from '../services/FetchAPI';

function RecipeDetails(props) {
  const history = useHistory();
  const { match: { params } } = props;
  const { location: { pathname } } = history;

  const [details, setDetails] = useState({
    type: '',
    myRecipe: {},
    item: [],
  });
  const [recommendations, setRecommendations] = useState([]);

  const [handleStartButton, setHandleStartButton] = useState({
    isRecipeDone: false,
    isRecipeInProgress: false,
  });

  function generateArrayOfIngredientsAndMeasures(response) {
    const IngredientsAndMeasures = [];

    if (response) {
      const arrayOfEntries = Object.entries(response);
      const THIRTEEN_CHARACTER = 13;
      const FIFTEEN_CHARACTER = 15;

      arrayOfEntries.forEach((item) => {
        const objectItem = {};
        const [ingredientKey, ingredientValue] = item;
        if (ingredientKey.includes('strIngredient') && ingredientValue) {
          const itemIndex = item[0].slice(THIRTEEN_CHARACTER, FIFTEEN_CHARACTER);

          const getMeasures = arrayOfEntries.find((measure) => (
            measure[0] === `strMeasure${itemIndex}`
          ));
          const measureValue = getMeasures.pop();

          objectItem.ingredient = ingredientValue;
          objectItem.measure = measureValue;

          IngredientsAndMeasures.push(objectItem);
        }
      });
    }
    return IngredientsAndMeasures;
  }

  async function callFetchById() {
    const SIX = 6;
    const getType = pathname.slice(1, SIX);
    const type = getType === 'foods' ? 'meals' : 'drinks';
    const response = await fetchById(type, params.id);

    const recipeValues = Object.values(response)[0][0];

    const myResult = {
      type: Object.keys(response)[0],
      myRecipe: recipeValues,
      item: generateArrayOfIngredientsAndMeasures(recipeValues),
    };
    setDetails(myResult);
  }

  function toggleType() {
    if (details.type === 'drinks') {
      return 'meals';
    }
    return 'drinks';
  }

  async function fetchRecommendations() {
    const SIX = 6;
    const recomendation = await fetchFoodsList(toggleType());
    const myRecommendations = recomendation.slice(0, SIX);

    setRecommendations(myRecommendations);
  }

  function handleLocalStorage() {
    const doneRecipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipes = doneRecipesFromStorage || [];

    setHandleStartButton({
      ...handleStartButton,
      isRecipeDone: doneRecipes.some((recipe) => recipe.id === params.id),
    });
  }
  // // 29 e 30 em função unica, mas quebra testes.
  // function handleLocalStorage() {
  //   const doneRecipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const doneRecipes = doneRecipesFromStorage || [];

  //   const inProgressFromStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const progressRecipes = inProgressFromStorage || [];

  //   const mealsAndCocktails = Object.keys(progressRecipes.meals)
  //     .concat(Object.keys(progressRecipes.cocktails));

  //   setHandleStartButton({
  //     isRecipeDone: doneRecipes.some((recipe) => recipe.id === params.id),
  //     isRecipeInProgress: mealsAndCocktails.some((id) => id === params.id),
  //   });
  // }

  useEffect(() => {
    callFetchById();
    handleLocalStorage();
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [details]);

  function handleClick() {
    history.push(`${pathname}/in-progress`);
  }

  return (
    <fieldset>
      <legend>
        RecipeDetails
      </legend>
      <h2 data-testid="recipe-title">
        {details.myRecipe.strDrink || details.myRecipe.strMeal}
      </h2>
      <img
        data-testid="recipe-photo"
        src={ details.myRecipe.strDrinkThumb || details.myRecipe.strMealThumb }
        alt={ details.myRecipe.strDrink || details.myRecipe.strMeal }
        style={ { width: 200 } }
      />

      <ShareFavorite foodObject={ details.myRecipe } />

      <h4 data-testid="recipe-category">
        {details.myRecipe.strAlcoholic || details.myRecipe.strCategory}
      </h4>
      <h3>Ingredients</h3>
      <ul>
        {details.item.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${item.ingredient} - ${item.measure}`}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{details.myRecipe.strInstructions}</p>
      {
        details.type === 'meals'
          && (
            <>
              <h3>Video</h3>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ `https://www.youtube.com/embed/${details.myRecipe.strYoutube.split('=')[1]}` }
                title="YouTube video player"
                frameBorder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          )
      }
      <h3>Recommendations</h3>
      <div
        style={ { overflow: 'auto', whiteSpace: 'nowrap', width: '300px' } }
      >
        { recommendations.map((item, index) => (
          <div
            style={ {
              width: '160px',
              display: 'inline-block',
              textAlign: 'center',
            } }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>
              {item.strDrink || item.strMeal}
            </p>
            <img
              src={ item.strDrinkThumb || item.strMealThumb }
              alt={ item.strDrink || item.strMeal }
              style={ { width: 100 } }
            />
          </div>
        ))}
      </div>
      { !handleStartButton.isRecipeDone
      && (
        <button
          className="footer"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          { handleStartButton.isRecipeInProgress ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </fieldset>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
