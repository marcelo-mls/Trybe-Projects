import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HorizontalButtons from '../components/HorizontalButtons';
import FiltersButton from '../components/FiltersButton';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  function getDoneRecipesFromStorage() {
    const recipesFromStorage = localStorage.getItem('doneRecipes');
    const doneRecipesFromStorage = JSON.parse(recipesFromStorage) === null
      ? []
      : JSON.parse(recipesFromStorage);

    console.log(doneRecipesFromStorage);
    setDoneRecipes(doneRecipesFromStorage);
    console.log(doneRecipes);
  }

  useEffect(() => {
    getDoneRecipesFromStorage();
  }, []);

  return (
    <div>
      <Header title="Done Recipes" disableSearch />
      <FiltersButton />
      {doneRecipes.map((recipe, index) => (
        <fieldset key={ index }>
          <legend>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </legend>
          <img
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '100px', height: '100px' } }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <HorizontalButtons index={ index } foodObject={ recipe } removeFavorite />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {
              recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`
            }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <ul>
            { recipe.type === 'food'
            && recipe.tags.slice(0, 2).map((tag, i) => (
              <li key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}

export default DoneRecipes;
