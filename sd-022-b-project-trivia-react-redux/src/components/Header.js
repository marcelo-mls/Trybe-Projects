import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

class Header extends React.Component {
  setGravatarHash = () => {
    const { getEmail } = this.props;
    const convertEmail = md5(getEmail).toString();
    return (`https://www.gravatar.com/avatar/${convertEmail}`);
  }

  render() {
    const { getUsername, getScore } = this.props;
    return (
      <header className="header">
        <img
          alt="Perfil"
          data-testid="header-profile-picture"
          src={ this.setGravatarHash() }
        />
        <div className="header-elements">
          <div>
            <p>Name:</p>
            <p data-testid="header-player-name">{ getUsername }</p>
          </div>

          <div>
            <p>Score:</p>
            <p data-testid="header-score">{getScore}</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  getUsername: PropTypes.string,
  getEmail: PropTypes.string,
  getScore: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  getUsername: state.player.name,
  getEmail: state.player.gravatarEmail,
  getScore: state.player.score,
});

export default connect(mapStateToProps)(Header);
