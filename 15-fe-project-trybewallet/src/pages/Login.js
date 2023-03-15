import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validateInputsData());
  }

  validateInputsData = () => {
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

    const { email, password } = this.state;
    const SIX = 6;
    const emailRegex = /\S+@\S+\.\S+/;

    const checkPassword = password.length >= SIX;
    const checkEmail = emailRegex.test(email);

    this.setState({
      isButtonDisabled: !(checkPassword && checkEmail),
    });
  }

  handleClick = () => {
    const { history, addUserDispatch } = this.props;
    const { email } = this.state;
    addUserDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;

    return (
      <div>
        <fieldset>
          <legend>Login</legend>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
            value={ email }
            placeholder="email"
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
            value={ password }
            placeholder="password"
          />
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  addUserDispatch: PropTypes.func,
}.isRequired;

function mapDispatchToProps(dispatch) {
  return {
    addUserDispatch: (email) => dispatch(addUser(email)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
