import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CategoriesCard from '../components/CategoriesCard';
import ProductsCard from '../components/ProductsCard';
import Footer from '../components/Footer';
import '../css/ProductsList.css';

class ProductsList extends React.Component {
    state = {
      inputSearch: '',
      productsList: [],
    }

    callgetProductsFromCategoryAndQuery = async () => {
      const { inputSearch } = this.state;
      const products = await getProductsFromCategoryAndQuery(undefined, inputSearch);
      this.setState({
        productsList: products.results,
      });
    }

    onRadioClick = async (event) => {
      const { value } = event.target;
      const products = await getProductsFromCategoryAndQuery(undefined, value);
      this.setState({
        productsList: products.results,
      });
    }

    handleChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value,
      });
    }

    render() {
      const { inputSearch, productsList } = this.state;

      const { categoriesList, onClick } = this.props;

      return (
        <div>
          <header className="header">
            <p className="header-title">Front-end Online Store</p>
            <div className="items-header">
              <div className="input-search">
                <label htmlFor="inputSearch">
                  <input
                    type="text"
                    name="inputSearch"
                    id="inputSearch"
                    data-testid="query-input"
                    value={ inputSearch }
                    onChange={ this.handleChange }
                    placeholder="Digite algum termo de pesquisa"
                  />
                </label>
                <button
                  type="button"
                  data-testid="query-button"
                  onClick={ this.callgetProductsFromCategoryAndQuery }
                >
                  Pesquisar
                </button>
              </div>
              <div className="cart">
                <Link to="/cart" data-testid="shopping-cart-button">Ver carrinho</Link>
                <img className="cart-image" src="https://icon-library.com/images/white-shopping-cart-icon-png/white-shopping-cart-icon-png-19.jpg" alt="carriho" />
              </div>
            </div>
          </header>
          <main className="main">
            <div className="category-list">
              { categoriesList.map((category) => (
                <CategoriesCard
                  onClick={ this.onRadioClick }
                  key={ category.id }
                  name={ category.name }
                />
              )) }
            </div>
            <div className="products-list">
              {productsList.length === 0
                && (
                  <p className="text" data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </p>)}
              { productsList.map((product) => (
                <div className="product-cart" key={ product.id }>
                  <ProductsCard
                    title={ product.title }
                    thumbnail={ product.thumbnail }
                    price={ product.price }
                    id={ product.id }
                    product={ product }
                  />
                  <button
                    className="button"
                    data-testid="product-add-to-cart"
                    id={ product.id }
                    type="button"
                    onClick={ () => onClick(product) }
                  >
                    Enviar para o carrinho
                  </button>
                </div>
              )) }
            </div>
          </main>
          <Footer />
        </div>
      );
    }
}

ProductsList.propTypes = {
  categoriesList: PropTypes.array,
}.isRequired;

export default ProductsList;
