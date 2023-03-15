import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../Context/RecipeContext';

function Ingredients(props) {
  const { foodObject, checkbox, testId } = props;
  const [savedCheckbox, setSavedCheckbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idFood, setIdFood] = useState(0);
  const [numberCheckbox, setNumberCheckbox] = useState(0);
  const { verifyCheckbox } = useContext(RecipeContext);

  useEffect(() => {
    const ID = foodObject.idMeal || foodObject.idDrink;
    const savedFood = JSON.parse(localStorage.getItem('checkbox'));
    setIdFood(ID);
    if (!localStorage.getItem('checkbox')) {
      localStorage.setItem('checkbox', JSON.stringify({}));
    } else if (savedFood[ID]) {
      setSavedCheckbox(savedFood[ID]);
    }
    setLoading(true);
  }, []);

  function deleteItem(savedFood, itemIndex) {
    delete (savedFood[idFood][itemIndex]);
    localStorage.setItem('checkbox', JSON.stringify(savedFood));
  }

  function addItem(savedFood, itemIndex) {
    localStorage.setItem('checkbox',
      JSON.stringify({
        ...savedFood,
        [idFood]: {
          [itemIndex]: true,
          ...savedFood[idFood],
        },
      }));
  }

  function handleClick({ target }, index) {
    const { checked } = target;
    let savedFood = JSON.parse(localStorage.getItem('checkbox'));
    if (!checked) {
      deleteItem(savedFood, index);
    } else if (!savedFood) {
      localStorage.setItem('checkbox', JSON.stringify({ [idFood]: { index: true } }));
    } else {
      addItem(savedFood, index);
      savedFood = JSON.parse(localStorage.getItem('checkbox'));
    }
    setSavedCheckbox(savedFood[idFood]);
    verifyCheckbox(numberCheckbox, idFood, foodObject.idMeal ? 'meals' : 'cocktails');
  }

  function displayIngredients(mesures) {
    if (numberCheckbox === 0) {
      setNumberCheckbox(mesures.length);
    }
    if (!checkbox) {
      return mesures.map((mesure, index) => (
        <p key={ index } data-testid={ `${index}-${testId}` }>
          {mesure.ingredient}
          {' '}
          -
          {' '}
          {mesure.measure}
        </p>
      ));
    }
    return mesures.map((mesure, index) => (
      <form action="" key={ index }>
        <label htmlFor={ `Ingredient-${index}` } data-testid={ `${index}-${testId}` }>
          <input
            id={ `Ingredient-${index}` }
            type="checkbox"
            onChange={ (event) => handleClick(event, index) }
            checked={ !!savedCheckbox[index] }
          />
          {mesure.ingredient}
          {' '}
          -
          {' '}
          {mesure.measure}
        </label>
      </form>
    ));
  }

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
          const mesuresValue = getMeasures[1];
          objectItem.ingredient = ingredientValue;
          objectItem.measure = mesuresValue;
          IngredientsAndMeasures.push(objectItem);
        }
      });
    }
    return displayIngredients(IngredientsAndMeasures);
  }

  return (
    <div>
      {loading && generateArrayOfIngredientsAndMeasures(foodObject) }
    </div>
  );
}

Ingredients.propTypes = {
  foodObject: PropTypes.shape({}),
}.isRequired;

export default Ingredients;
