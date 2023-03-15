async function fetchAPI() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const request = await fetch(endpoint);
  const response = await request.json();
  const { results } = response;

  return results;
}

export default fetchAPI;
