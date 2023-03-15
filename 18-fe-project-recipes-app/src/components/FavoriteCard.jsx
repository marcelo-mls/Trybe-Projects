import React from 'react';
import PropTypes from 'prop-types';
import HorizontalButtons from './HorizontalButtons';

function FavoriteCard(props) {
  const { foodObject, index } = props;
  const { name, image, nationality, category } = foodObject;
  return (
    <fieldset>
      <legend data-testid={ `${index}-horizontal-name` }>
        { name }
      </legend>
      <h2
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${nationality} - ${category}` }
        { `${foodObject.alcoholicOrNot ? foodObject.alcoholicOrNot : ''}` }
      </h2>
      <img
        src={ image }
        data-testid={ `${index}-horizontal-image` }
        alt={ `foto de ${name}` }
        style={ { width: '200px', height: '200px' } }
      />
      <HorizontalButtons index={ index } foodObject={ foodObject } />
    </fieldset>
  );
}

FavoriteCard.propTypes = {
  foodObject: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;

export default FavoriteCard;
