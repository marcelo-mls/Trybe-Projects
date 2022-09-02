import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Drinks from '../pages/Drinks';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DrinksInProgress from '../pages/DrinksInProgress';
import FoodsInProgress from '../pages/FoodsInProgress';
import RecipeDetails from '../pages/RecipeDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:id/in-progress" component={ FoodsInProgress } />
      <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
      <Route path="/foods/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
