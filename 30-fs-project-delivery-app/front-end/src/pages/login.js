import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../context/appContext';
import api from '../services/api';
import '../styles/login.css';
import drinkSVG from '../images/drink.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const { setUserData } = useContext(appContext);
  const navigate = useNavigate();

  const validateEmailAndPassword = () => {
    const minLengthPassword = 6;
    const emailRegex = /\S+@\S+\.\S+/;
    return !(emailRegex.test(email) && password.length >= minLengthPassword);
  };

  const handleNavigate = (role) => {
    if (role === 'customer') { return navigate('/customer/products'); }
    if (role === 'seller') { return navigate('/seller/orders'); }
    if (role === 'administrator') { return navigate('/admin/manage'); }
  };

  const login = async () => {
    try {
      const result = await api.post('/login', { email, password });
      setUserData(result.data);
      localStorage.setItem('user', JSON.stringify(result.data));
      handleNavigate(result.data.role);
    } catch (error) {
      setIsInvalid(true);
    }
  };

  useEffect(() => {
    setIsDisabled(validateEmailAndPassword());
  }, [email, password]);

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-logo">
          <img src={ drinkSVG } alt="drink SVG" />
          <div className="login-title">
            <p className="title-drink">THE DRINK</p>
            <p className="title-app">DELIVERY APP</p>
          </div>
        </div>

        <div className="login-form">
          <p className="login-form-p">Email:</p>
          <input
            className="login-form-input"
            data-testid="common_login__input-email"
            type="email"
            placeholder="Type your email here"
            name="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <p className="login-form-p">Password:</p>
          <input
            className="login-form-input"
            data-testid="common_login__input-password"
            type="password"
            name="password"
            placeholder="Do you know your password?"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
          <div className="login-form-buttons">
            <button
              className="login-form-btn login-form-btn-login"
              onClick={ login }
              type="button"
              data-testid="common_login__button-login"
              disabled={ isDisabled }
            >
              Login
            </button>
            <button
              className="login-form-btn"
              type="button"
              data-testid="common_login__button-register"
              onClick={ () => navigate('/register') }
            >
              Register
            </button>
          </div>
        </div>
        {isInvalid && (
          <p
            data-testid="common_login__element-invalid-email"
            className="login-invalid"
          >
            Ops! Invalid Credentials
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
