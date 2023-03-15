import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  getRankingFromLocalStorage = () => {
    const playersInfo = JSON.parse(localStorage.getItem('ranking'));
    const oneNegative = -1;
    return (playersInfo.sort((a, b) => {
      if (a.score > b.score) return oneNegative;
      if (a.score < b.score) return 1;
      return 0;
    }));
  }

  render() {
    return (
      <div className="ranking-container" data-testid="ranking-title">
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Play again
        </button>
        {this.getRankingFromLocalStorage().map((player, index) => (
          <div className="ranking" key={ index }>
            <img
              alt="Perfil"
              src={ player.picture }
            />
            <div className="div-info">
              <p data-testid={ `player-name-${index}` }>{ `Name: ${player.name}` }</p>
              <p
                data-testid={ `player-score-${index}` }
              >
                {`Total score: ${player.score}`}

              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Ranking;
