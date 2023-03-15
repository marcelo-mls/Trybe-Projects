import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';
import api from '../services/api';

function SellerOrders() {
  const [sales, setSales] = useState([]);

  const navigate = useNavigate();

  async function getSales() {
    const result = await api.get('/sales');
    console.log(result.data);
    setSales(result.data);
  }

  const formatCurrency = (price) => new Intl.NumberFormat(
    'pt-br',
    { style: 'currency', currency: 'BRL' },
  ).format(price);

  const testIds = {
    id: 'seller_orders__element-order-id-',
    status: 'seller_orders__element-delivery-status-',
    date: 'seller_orders__element-order-date-',
    address: 'seller_orders__element-card-address-',
    price: 'seller_orders__element-card-price-',
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <Nav />
      <fieldset>
        <legend>Seller Orders</legend>
        {
          sales.map((sale) => (
            <button
              key={ sale.id }
              type="button"
              onClick={ () => navigate(`/seller/orders/${sale.id}`) }
            >
              <p data-testid={ `${testIds.id}${sale.id}` }>{sale.id}</p>
              <p data-testid={ `${testIds.status}${sale.id}` }>{sale.status}</p>
              <p data-testid={ `${testIds.date}${sale.id}` }>{sale.saleDate}</p>
              <p data-testid={ `${testIds.address}${sale.id}` }>
                {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
              </p>
              <strong>
                <p data-testid={ `${testIds.price}${sale.id}` }>
                  {formatCurrency(sale.totalPrice)}
                </p>
              </strong>
            </button>
          ))
        }
      </fieldset>
    </>
  );
}

export default SellerOrders;
