import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesInProgress from '../components/RecipesInProgress';
import { fetchById } from '../services/FetchAPI';

function FoodsInProgress(props) {
  const [food, setFood] = useState({});
  const { match } = props;
  const { params } = match;
  const history = useHistory();

  async function fetchFoodById() {
    setFood(await fetchById('meals', params.id));
  }

  useEffect(() => {
    fetchFoodById();
    console.log(history);
  }, []);

  function renderRecipes() {
    const { meals } = food;
    const { strMeal, strMealThumb, strCategory, strInstructions } = meals[0];
    return (<RecipesInProgress
      foodObject={ meals[0] }
      title={ strMeal }
      image={ strMealThumb }
      category={ strCategory }
      instructions={ strInstructions }
      history={ history }
    />);
  }

  return (
    <div>
      {Object.keys(food).length !== 0
       && (renderRecipes())}
    </div>
  );
}

FoodsInProgress.propTypes = {
  match: PropTypes.shape({}),
}.isRequired;

export default FoodsInProgress;
