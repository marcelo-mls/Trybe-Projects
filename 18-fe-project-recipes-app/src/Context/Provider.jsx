import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [globalRecipes, setGlobalRecipes] = useState({});
  const [refreshFavorite, setRefreshFavorite] = useState(false);
  const [verifyButton, setVerifyButton] = useState(true);

  function toggleRefresh() {
    setRefreshFavorite(!refreshFavorite);
  }

  function createObject(type, idFood) {
    const localStorageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!localStorageProgress) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ [type]: { [idFood]: [] } }));
    } else {
      const newFood = localStorageProgress;
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ ...newFood, [type]: { ...newFood[type], [idFood]: [] } }));
    }
  }

  function verifyCheckbox(numberCheckbox, idFood, type) {
    const localCheckbox = JSON.parse(localStorage.getItem('checkbox'));
    const lengthCheckbox = (Object.keys(localCheckbox[idFood]).length);
    if (lengthCheckbox > 0) {
      createObject(type, idFood);
    }
    if (numberCheckbox === lengthCheckbox) {
      setVerifyButton(false);
    } else {
      setVerifyButton(true);
    }
  }

  const contextValue = {
    globalRecipes,
    setGlobalRecipes,
    verifyButton,
    verifyCheckbox,
    toggleRefresh,
    refreshFavorite,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipeProvider;
