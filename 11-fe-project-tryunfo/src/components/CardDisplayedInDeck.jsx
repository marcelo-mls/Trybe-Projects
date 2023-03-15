import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardDisplayedInDeck extends React.Component {
  render() {
    const {
      cardKey,
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      onClick,
    } = this.props;

    return (
      <div key={ cardKey } className="div-DisplayedInDeck">
        <Card
          className="card-DisplayedInDeck"
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <button
          id={ cardName }
          type="button"
          data-testid="delete-button"
          onClick={ onClick }
        >
          Excluir
        </button>
      </div>
    );
  }
}

CardDisplayedInDeck.propTypes = {
  cardKey: PropTypes.string,
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default CardDisplayedInDeck;
