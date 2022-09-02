import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../styles/Feedback.css';

import Header from '../components/Header';

class Feedback extends React.Component {
  shouldPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  shouldRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { getAssertions, getScore } = this.props;
    const ASSERTIONS = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        <div className="feedback">
          <p
            data-testid="feedback-total-question"
          >
            { `Total assertions: ${getAssertions}` }

          </p>
          <p data-testid="feedback-total-score">{ `Total score: ${getScore}` }</p>
          <p data-testid="feedback-text">
            {getAssertions >= ASSERTIONS ? 'Well Done!' : 'Could be better...'}
          </p>
        </div>

        <div className="buttons">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.shouldPlayAgain }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.shouldRanking }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  getAssertions: PropTypes.number,
  getScore: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  getAssertions: state.player.assertions,
  getScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
