import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMealsAPI, fetchDrinksAPI } from '../services/FetchAPI';
import RecipeContext from '../Context/RecipeContext';

function SearchBar() {
  const history = useHistory();
  const [radioState, setRadioState] = useState('');
  const [searchBarState, setSearchBarState] = useState('');
  const { globalRecipes, setGlobalRecipes } = useContext(RecipeContext);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'radio-button') {
      setRadioState(value);
    }
    if (name === 'search-input') {
      setSearchBarState(value);
    }
  }

  function verifyResponse(response) {
    if (response.meals === null || response.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

  async function fetchByHistory() {
    const { pathname } = history.location;
    let response;

    if (pathname === '/foods') {
      response = await fetchMealsAPI(radioState, searchBarState);
    }
    if (pathname === '/drinks') {
      response = await fetchDrinksAPI(radioState, searchBarState);
    }
    verifyResponse(response);
    setGlobalRecipes({
      type: Object.keys(response)[0],
      myRecipes: Object.values(response)[0],
    });
  }

  async function handleClick() {
    if (radioState === 'first-letter' && searchBarState.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      await fetchByHistory();
    }
  }

  useEffect(() => {
    const { pathname } = history.location;
    const { myRecipes, type } = globalRecipes;

    if (myRecipes && myRecipes.length === 1) {
      return type === 'meals'
        ? history.push(`${pathname}/${myRecipes[0].idMeal}`)
        : history.push(`${pathname}/${myRecipes[0].idDrink}`);
    }
  }, [globalRecipes]);

  return (
    <fieldset>
      <legend>Search Bar</legend>
      <label htmlFor="input-header">
        <input
          type="text"
          placeholder="Search Recipe"
          data-testid="search-input"
          name="search-input"
          onChange={ handleChange }
        />
      </label>
      <input
        type="radio"
        name="radio-button"
        value="ingredient"
        data-testid="ingredient-search-radio"
        onChange={ handleChange }
      />
      Ingredient
      <input
        type="radio"
        name="radio-button"
        value="name"
        data-testid="name-search-radio"
        onChange={ handleChange }
      />
      Name
      <input
        type="radio"
        name="radio-button"
        value="first-letter"
        data-testid="first-letter-search-radio"
        onChange={ handleChange }
      />
      First letter
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </fieldset>
  );
}

export default SearchBar;
