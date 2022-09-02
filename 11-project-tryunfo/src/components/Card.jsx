import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className="divConteinar">
        <p data-testid="name-card" className="name-card">{ ` ${cardName}` }</p>
        <p data-testid="rare-card">{ cardRare }</p>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p className="description" data-testid="description-card">{ cardDescription }</p>
        <div>
          <span className="attr-group">
            <p data-testid="attr1-card" className="attr-card force">{ cardAttr1 }</p>
            chaotic
          </span>
          <span className="attr-group">
            <p data-testid="attr2-card" className="attr-card agili">{ cardAttr2 }</p>
            alcoholism
          </span>
          <span className="attr-group">
            <p data-testid="attr3-card" className="attr-card intel">{ cardAttr3 }</p>
            Intelligence
          </span>
        </div>
        { cardTrunfo === true ? <p data-testid="trunfo-card">Super Trunfo</p> : ''}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;

export default Card;
