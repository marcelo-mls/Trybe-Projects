import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';
import api from '../services/api';

function CustomerCheckout() {
  const [cart, setCart] = useState();
  const [expense, setExpense] = useState();
  const [sellers, setSellers] = useState();
  const [seller, setSeller] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [deliveryNumber, setDeliveryNumber] = useState();
  const [status] = useState('Pendente');
  const items = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
    'Remover Item',
  ];
  const custom = 'customer_checkout__';
  const navigate = useNavigate();

  const removeItem = ({ target }) => {
    const newCart = cart.filter((product, index) => index !== Number(target.id));
    setCart(newCart);
  };

  useEffect(() => {
    const getCartItems = () => {
      const allCart = JSON.parse(localStorage.getItem('cart'));
      const newCart = allCart.filter((element) => element.quantity > 0);
      setCart(newCart);
    };

    const getSellers = async () => {
      const result = await api.get('/users/sellers');
      setSellers(result.data);
    };
    getCartItems();
    getSellers();
  }, []);

  useEffect(() => {
    if (sellers) setSeller(sellers[0].id);
  }, [sellers]);

  useEffect(() => {
    if (cart) {
      const expenseItem = cart
        .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
      setExpense(expenseItem.toFixed(2).replace(/\./, ','));
    }
  }, [cart]);

  const submitOrder = async () => {
    const { token, id } = JSON.parse(localStorage.getItem('user'));
    const result = await api.post(
      '/sales',
      { totalPrice: expense,
        deliveryAddress,
        deliveryNumber,
        saleDate: new Date(),
        status,
        userId: id,
        sellerId: seller,
        cart,
      },
      { headers: { Authorization: token } },
    );
    navigate(`customer/orders/${result.data.id}`);
  };

  return (
    <div>
      <Nav />
      <div>
        {cart
          ? (
            <table>
              <thead>
                <tr>
                  {items.map((element, index) => (
                    <th key={ index }>{element}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                { cart.map((product, index) => (
                  <tr key={ index }>
                    <td
                      data-testid={ `${custom}element-order-table-item-number-${index}` }
                    >
                      {index + 1}
                    </td>
                    <td
                      data-testid={ `${custom}element-order-table-name-${index}` }
                    >
                      {product.name}
                    </td>
                    <td
                      data-testid={ `${custom}element-order-table-quantity-${index}` }
                    >
                      {product.quantity}
                    </td>
                    <td
                      data-testid={ `${custom}element-order-table-unit-price-${index}` }
                    >
                      {product.price.replace(/\./, ',')}
                    </td>
                    <td
                      data-testid={ `${custom}element-order-table-sub-total-${index}` }
                    >
                      {(product.price * product.quantity).toFixed(2).replace(/\./, ',')}
                    </td>
                    <th>
                      <button
                        data-testid={ `${custom}element-order-table-remove-${index}` }
                        type="button"
                        onClick={ removeItem }
                        id={ index }
                      >
                        REMOVE
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>) : <p>Carregando</p>}
        <strong>
          <span>Total: R$</span>
          <span
            data-testid={ `${custom}element-order-total-price` }
          >
            {expense}
          </span>
        </strong>
      </div>
      <div>
        <select
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target }) => setSeller(target.value) }
        >
          { sellers && sellers
            .map((element, i) => (
              <option
                value={ element.id }
                key={ i }
              >
                { element.name }
              </option>))}
        </select>
        <input
          data-testid="customer_checkout__input-address"
          placeholder="Address"
          onChange={ ({ target }) => setDeliveryAddress(target.value) }
        />
        <input
          data-testid="customer_checkout__input-address-number"
          placeholder="Address Number"
          onChange={ ({ target }) => setDeliveryNumber(target.value) }
        />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ submitOrder }
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default CustomerCheckout;
