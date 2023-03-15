const fetchItem = async (productId) => {
  try {
    const fetchResponse = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const productdata = await fetchResponse.json();
    return productdata;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
