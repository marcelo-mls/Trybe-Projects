import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import rockGlass from '../images/rockGlass.svg';

function Login() {
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const SEIS = 6;
    if (emailRegex.test(email) && password.length > SEIS) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password]);

  const saveAndRedirect = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div className="meals">
      <span className="logo">FooDrink</span>
      <form>
        <input
          type="email"
          placeholder="Digite seu email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          required
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          required
        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isValid }
          onClick={ saveAndRedirect }
        >
          Entrar
        </button>
      </form>
      {/* <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
    </div>
  );
}

export default Login;
