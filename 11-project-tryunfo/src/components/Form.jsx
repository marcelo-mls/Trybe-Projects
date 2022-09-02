import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form className="formContainer">

        <label htmlFor="cardName">
          name
          <input
            type="text"
            name="cardName"
            id="cardName"
            data-testid="name-input"
            placeholder="Type the name"
            value={ cardName }
            onChange={ onInputChange }
            required
          />
        </label>

        <label htmlFor="cardDescription">
          description
          <input
            type="textarea"
            name="cardDescription"
            id="cardDescription"
            data-testid="description-input"
            placeholder="Type an awesome description"
            value={ cardDescription }
            onChange={ onInputChange }
            required
          />
        </label>

        <label htmlFor="cardAttr1">
          chaotic
          <input
            type="number"
            name="cardAttr1"
            id="cardAttr1"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
            min="0"
            max="90"
            required
          />
        </label>

        <label htmlFor="cardAttr2">
          alcoholism
          <input
            type="number"
            name="cardAttr2"
            id="cardAttr2"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
            min="0"
            max="90"
            required
          />
        </label>

        <label htmlFor="cardAttr3">
          intelligence
          <input
            type="number"
            name="cardAttr3"
            id="cardAttr3"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
            min="0"
            max="90"
            required
          />
        </label>

        <label htmlFor="cardImage">
          image
          <input
            type="text"
            name="cardImage"
            id="cardImage"
            data-testid="image-input"
            placeholder="www.TypeURLHere.com"
            value={ cardImage }
            onChange={ onInputChange }
            required
          />
        </label>

        <label htmlFor="cardRare">
          rarity
          <select
            name="cardRare"
            id="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
            required
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>

        <div>
          {
            !hasTrunfo
              ? (
                <div className="checkboxLabel">
                  <label htmlFor="cardTrunfo">
                    <input
                      type="checkbox"
                      name="cardTrunfo"
                      id="cardTrunfo"
                      data-testid="trunfo-input"
                      checked={ cardTrunfo }
                      onChange={ onInputChange }
                    />
                  </label>
                  Super trunfo?
                </div>
              )
              : <p>Você já tem um Super Trunfo em seu baralho</p>
          }
        </div>

        <label htmlFor="save">
          <input
            className="saveBtn"
            type="button"
            value="save"
            id="save"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          />
        </label>

      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
