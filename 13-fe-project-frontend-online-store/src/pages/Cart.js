import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

class Cart extends React.Component {
  state = {
    products: [],
    filteredProducts: [],
  }

  componentDidMount() {
    const { productDetails } = this.props;
    this.setState({ products: productDetails },
      () => this.setUniqueProductsWithQuantity());
  }

  setUniqueProductsWithQuantity = () => {
    const { products } = this.state;
    // separar os produtos unicos
    const arrayWithAllIDs = products.map((product) => product.id);
    const uniqueIDs = [...new Set(arrayWithAllIDs)];
    const uniqueProducts = [];
    // foreach nos unicos, para criar novo objeto a ser renderizado
    uniqueIDs.forEach((id) => {
      // find para trazer os objetos completos de cada produto, uma unica vez.
      const productsX = products.find((product) => product.id === id);
      // filter pra contar os produtos
      const quantity = products.filter((product) => product.id === id).length;

      // adiciona uma nova chave dentro deles com a quantity.
      productsX.quantity = quantity;
      uniqueProducts.push(productsX);
      const negative = -1;
      uniqueProducts.sort((b, a) => {
        if (a.title < b.title) return negative;
        if (a.title > b.title) return 1;
        return 0;
      });
    });
    this.setState({ filteredProducts: uniqueProducts });
  }

  addClick = (event) => {
    this.setState((prevState) => ({
      products: [...prevState.products, event] }),
    () => this.setUniqueProductsWithQuantity());
  }

  // Não funciona ainda, pois altera a ordem dos items
  removeClick = (event) => {
    const { filteredProducts, products } = this.state;
    filteredProducts.forEach((product, index) => {
      if (product.id === event) {
        const filter = products.filter((_product, i) => i !== index);
        this.setState({ products: [...filter] },
          () => this.setUniqueProductsWithQuantity());
      }
    });
    this.setUniqueProductsWithQuantity();
  }

  render() {
    const { filteredProducts } = this.state;
    return (
      <div>
        <Link to="/">Home</Link>
        <div>
          {filteredProducts.length === 0
          && <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</h4>}
          {filteredProducts.map((product) => (
            <div key={ product.id }>
              <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
              <p>{product.price}</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.removeClick(product.id) }
              >
                [ - ]
              </button>
              <span data-testid="shopping-cart-product-quantity">
                {product.quantity}
              </span>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.addClick(product) }
              >
                [ + ]
              </button>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

Cart.propTypes = {
  productDetails: PropTypes.array,
}.isRequired;

export default Cart;
