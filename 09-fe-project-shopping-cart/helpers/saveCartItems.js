const saveCartItems = (parameter) => {
  localStorage.setItem('cartItems', parameter);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
