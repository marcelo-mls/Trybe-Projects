import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      inputLoginName: '',
      isLoading: false,
      shouldRedirect: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { inputLoginName } = this.state;
    this.setState({
      isLoading: true,
    });

    await createUser({ name: inputLoginName });
    this.setState({
      isLoading: false,
      shouldRedirect: true,
    });
  }

  render() {
    const { inputLoginName, isLoading, shouldRedirect } = this.state;
    const charLimit = 3;

    return (
      <>
        <div className="page-login" data-testid="page-login">
          <label htmlFor="inputLoginName" className="inputLoginName-label">
            Login
            <input
              className="inputLoginName"
              type="text"
              name="inputLoginName"
              id="inputLoginName"
              data-testid="login-name-input"
              placeholder="Name"
              value={ inputLoginName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="login-submit-button"
            type="button"
            data-testid="login-submit-button"
            disabled={ inputLoginName.length < charLimit }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
        { isLoading && <Loading className="Loading" /> }
        { shouldRedirect && <Redirect to="/search" /> }
      </>
    );
  }
}

export default Login;
