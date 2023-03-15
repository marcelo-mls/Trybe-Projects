import React from 'react';
import PropTypes from 'prop-types';

class CategoriesCard extends React.Component {
  render() {
    const {
      name,
      onClick,
    } = this.props;

    return (
      <label
        className="radio-button"
        htmlFor="categoryRadio"
        data-testid="category"
      >
        <input
          onClick={ onClick }
          type="radio"
          name="categoryRadio"
          value={ name }
          id="categoryRadio"
        />
        {' '}
        { name }
      </label>
    );
  }
}
CategoriesCard.propTypes = {
  name: PropTypes.string,
}.isRequired;
export default CategoriesCard;
