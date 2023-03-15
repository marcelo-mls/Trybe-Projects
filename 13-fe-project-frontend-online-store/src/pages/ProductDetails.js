import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import Footer from '../components/Footer';

class ProductDetails extends React.Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductDetails(id);
    this.setState({ product: response });
  }

  render() {
    const { onClick } = this.props;
    const { product } = this.state;
    return (
      <div>
        <Link to="/">Home</Link>
        {' / '}
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>

        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{ product.price }</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => onClick(product) }
        >
          Enviar para o carrinho
        </button>
        <Footer />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ProductDetails;
