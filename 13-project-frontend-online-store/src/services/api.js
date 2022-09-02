export async function getCategories() {
  // Implementando nosso codigo aqui
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implementando aqui! //oi
  let url = '';
  if (!categoryId) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }
  if (!query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  }
  const request = await fetch(url);
  const response = await request.json();
  return response;
}

export async function getProductDetails(id) {
  const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await request.json();
  return response;
}
