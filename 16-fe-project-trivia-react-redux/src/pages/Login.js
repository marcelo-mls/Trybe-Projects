import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../trivia.png';
import { addUser, clearScore } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    username: '',
    email: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { username, email } = this.state;
      if (username && email) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  addUser = () => {
    const { username, email } = this.state;
    const { addUserDispatch } = this.props;
    addUserDispatch({ username, email });
  }

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  handleClick = async () => {
    const { dispatchClearScore } = this.props;
    const END_POINT = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(END_POINT);
    const data = (await response.json()).token;
    localStorage.setItem('token', data);
    this.addUser();
    const { history } = this.props;
    dispatchClearScore();
    history.push('/game');
  }

  render() {
    const { username, email, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            className="input-player-name"
            data-testid="input-player-name"
            type="text"
            name="username"
            placeholder="Username"
            value={ username }
            onChange={ this.handleChange }
          />
          <input
            className="input-gravatar-email"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            className="btn-play"
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            className="btn-settings"
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClickSettings }
          >
            Settings
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  dispatchClearScore: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (payload) => dispatch(addUser(payload)),
  dispatchClearScore: () => dispatch(clearScore()),
});

export default connect(null, mapDispatchToProps)(Login);
