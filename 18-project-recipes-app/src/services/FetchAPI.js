export async function fetchMealsAPI(endpointType, query) {
  let endpoint = '';
  if (endpointType === 'ingredient') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
  }
  if (endpointType === 'name') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  }
  if (endpointType === 'first-letter') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
  }

  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

export async function fetchDrinksAPI(endpointType, query) {
  let endpoint = '';
  if (endpointType === 'ingredient') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
  }
  if (endpointType === 'name') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
  }
  if (endpointType === 'first-letter') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
  }

  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

export async function fetchFoodsList(endPointType) {
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  if (endPointType === 'drinks') {
    endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }

  const request = await fetch(endpoint);
  const response = await request.json();
  return response[endPointType];
}

export async function foodsCategoriesAPI(endPointType) {
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  if (endPointType === 'drinks') {
    endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }
  const request = await fetch(endpoint);
  const response = await request.json();
  return response[endPointType];
}

export async function searchFoods(endPointType, query) {
  let endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;

  if (endPointType === 'drinks') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query}`;
  }

  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
}

export async function fetchById(endpointType, id) {
  let endpoint = '';
  if (endpointType === 'meals') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  }
  if (endpointType === 'drinks') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}
