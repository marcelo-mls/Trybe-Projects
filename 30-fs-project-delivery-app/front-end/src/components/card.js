import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { product, setExpense } = props;
  const { price, urlImage, name, id } = product;
  const [quantity, setQuantity] = useState(0);

  const saveItens = ({ target }) => {
    const { value } = target;
    setQuantity(Number(value));
  };

  const add = async () => {
    setQuantity(quantity + 1);
  };

  const rm = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[id - 1].quantity = Number(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    const expense = cart
      .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
    setExpense(expense);
  }, [quantity]);

  return (
    <div style={ { border: '2px solid #3f3d56' } }>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace(/\./, ',') }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        style={ { width: 100 } }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        { name }
      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ rm }
      >
        -

      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
        onChange={ saveItens }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ add }
      >
        +

      </button>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.object,
}.isRequired;

export default Card;
