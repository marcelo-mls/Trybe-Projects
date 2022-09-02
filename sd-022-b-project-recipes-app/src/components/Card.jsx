import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card(props) {
  const { name, thumb, index, type, id } = props;
  const history = useHistory();
  function redirectToDetails() {
    if (type === 'meals') {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  }

  return (
    <fieldset data-testid={ `${index}-recipe-card` }>
      <button type="button" onClick={ redirectToDetails }>
        <legend data-testid={ `${index}-card-name` }>
          {name}
        </legend>
        <img
          src={ thumb }
          alt={ `foto e receita de ${name} ` }
          data-testid={ `${index}-card-img` }
          style={ { width: '200px', height: '200px' } }
        />
      </button>
    </fieldset>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  thumb: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.string,
}.isRequired;

export default Card;
