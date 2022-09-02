import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchFoodsList, foodsCategoriesAPI, searchFoods } from '../services/FetchAPI';
import Card from './Card';
import RecipeContext from '../Context/RecipeContext';

function Recipes(props) {
  const MAXIMUM_CARDS = 11;
  const MAXIMUM_CATEGORIES = 4;
  const { type } = props;
  const [firstRecipes, setFirstRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const { globalRecipes } = useContext(RecipeContext);

  async function fetchFoodAPI(endpoint) {
    const food = await fetchFoodsList(endpoint);
    setFirstRecipes(food.filter((_meal, index) => index <= MAXIMUM_CARDS));
    const foodsCategories = await foodsCategoriesAPI(endpoint);
    setCategories(foodsCategories.filter((_meal, index) => index <= MAXIMUM_CATEGORIES));
  }

  function resetFilters() {
    const { myRecipes } = globalRecipes;
    if (Object.keys(globalRecipes).length === 0) {
      fetchFoodAPI(type);
    } else if (myRecipes === null) {
      <Redirect to="/foods" />;
    } else {
      setFirstRecipes(myRecipes.filter((_meal, index) => index <= MAXIMUM_CARDS));
    }
  }

  useEffect(() => {
    resetFilters();
  }, [globalRecipes]);

  function mealsMap(meal, index) {
    return (
      <Card
        type={ type }
        key={ meal.idMeal }
        id={ meal.idMeal }
        name={ meal.strMeal }
        thumb={ meal.strMealThumb }
        index={ index }
      />
    );
  }

  function drinksMap(drink, index) {
    return (
      <Card
        type={ type }
        id={ drink.idDrink }
        key={ drink.idDrink }
        name={ drink.strDrink }
        thumb={ drink.strDrinkThumb }
        index={ index }
      />
    );
  }

  async function setFilter(value) {
    const filteredFoods = await searchFoods(type, value);
    if (type === 'meals') {
      const { meals } = filteredFoods;
      setFirstRecipes(meals.filter((meal, index) => index <= MAXIMUM_CARDS));
    } else {
      const { drinks } = filteredFoods;
      setFirstRecipes(drinks.filter((meal, index) => index <= MAXIMUM_CARDS));
    }
  }

  function filter(value) {
    if (selectedFilter === value) {
      setSelectedFilter('');
      resetFilters();
    } else {
      setSelectedFilter(value);
      setFilter(value);
    }
  }

  return (
    <div>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ resetFilters }
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={ category.strCategory }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => { filter(category.strCategory); } }
          >
            {category.strCategory}
          </button>))}
      </section>
      {
        type === 'meals' ? firstRecipes.map((meal, index) => mealsMap(meal, index))
          : firstRecipes.map((drink, index) => drinksMap(drink, index))
      }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Recipes;
