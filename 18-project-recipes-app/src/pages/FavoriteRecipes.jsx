import React, { useContext, useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import RecipeContext from '../Context/RecipeContext';
import FiltersButton from '../components/FiltersButton';

function FavoriteRecipes() {
  const { refreshFavorite } = useContext(RecipeContext);
  const [favoriteFoods, setFavoriteFoods] = useState([]);

  useEffect(() => {
    const localStorageFoods = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteFoods(localStorageFoods);
  }, [refreshFavorite]);

  return (
    <div>
      <Header title="Favorite Recipes" disableSearch />
      <FiltersButton />
      { favoriteFoods && favoriteFoods.map((foodObject, index) => (
        <FavoriteCard key={ foodObject.id } index={ index } foodObject={ foodObject } />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
