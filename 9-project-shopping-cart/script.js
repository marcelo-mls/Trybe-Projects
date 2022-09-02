// const { fetchItem } = require("./helpers/fetchItem");
// const { fetchProducts } = require("./helpers/fetchProducts");

// Inserido para conclusão do requisito 4, 8, 10
const olCartItems = document.querySelector('.cart__items');
// Fim da inserção para o requisito 4, 8, 10

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
};

// Inserido para conclusão do requisito 2
function insertListProducts() {
  const sectionClassItems = document.querySelector('.items');
  fetchProducts('computador').then((element) =>
    element.results.forEach((product) =>
    sectionClassItems.appendChild(createProductItemElement(product))));
}
insertListProducts();
// Fim da inserção para o requisito 2

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // Editado para conslusão do requisito 5
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
  event.target.remove();
  // Fim da edição para o requisito 5

  // Editado para conslusão do requisito 8
  saveCartItems(olCartItems.innerHTML);
  // Fim da edição para o requisito 8
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Inserido para conclusão do requisito 4
function addItemToCart() {
  /* const buttonClassItemAdd = document.querySelectorAll('.item_add')
  // Pq não retornou o array? deu length === 0 */
  const sectionClassItems = document.querySelector('.items');

  sectionClassItems.addEventListener('click', async (event) => {
    if (event.target.classList.value === 'item__add') {
    const getProductById = await fetchItem(getSkuFromProductItem(event.target.parentElement));
    const newLiWithCartItem = createCartItemElement(getProductById);
    olCartItems.appendChild(newLiWithCartItem);
    }
  });
}
addItemToCart();
// Fim da inserção para o requisito 4

// Inserido para conclusão do requisito 10
function emptyCart() {
  const buttonClassEmptyCart = document.querySelector('.empty-cart');
  buttonClassEmptyCart.addEventListener('click', () => {
    olCartItems.innerHTML = '';
  });
}
emptyCart();
// Fim da inserção para o requisito 10

// Inserido para conclusão do requisito 11
async function createLoadWhilePromiseIsPending() {
  const h1ClassLoading = document.createElement('h1');
  const sectionClassContainer = document.querySelector('.container');
  h1ClassLoading.innerText = 'carregando...';
  h1ClassLoading.classList = 'loading';
  sectionClassContainer.appendChild(h1ClassLoading);

  await fetchProducts('computador');
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
  h1ClassLoading.remove();
}
createLoadWhilePromiseIsPending();
// Fim da inserção para o requisito 11

window.onload = () => { };
