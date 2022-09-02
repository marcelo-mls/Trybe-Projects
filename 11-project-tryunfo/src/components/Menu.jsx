import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.Component {
  render() {
    const {
      filterName,
      filterRarity,
      filterTrunfo,
      onInputChange,
    } = this.props;
    return (
      <>
        <div className="checkboxLabel formContainer">
          <label htmlFor="filterTrunfo">
            <input type="checkbox" name="filterTrunfo" id="filterTrunfo" />
          </label>
          Usar baralho Padrão
        </div>

        <div className="formContainer">
          Filtros de Busca
          <label htmlFor="filterName">
            <input
              type="text"
              name="filterName"
              id="filterName"
              placeholder="Nome da Carta"
              data-testid="name-filter"
              value={ filterName }
              onChange={ onInputChange }
              disabled={ filterTrunfo }
            />
          </label>

          <label htmlFor="filterRarity">
            <select
              type="text"
              name="filterRarity"
              id="filterRarity"
              data-testid="rare-filter"
              value={ filterRarity }
              onChange={ onInputChange }
              disabled={ filterTrunfo }
            >
              <option value="">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>

          <div className="checkboxLabel checkboxLabelTrunfo">
            <label htmlFor="filterTrunfo">
              <input
                type="checkbox"
                name="filterTrunfo"
                id="filterTrunfo"
                data-testid="trunfo-filter"
                checked={ filterTrunfo }
                onChange={ onInputChange }
              />
            </label>
            Super Trunfo
          </div>
        </div>
      </>
    );
  }
}

Menu.propTypes = {
  filterName: PropTypes.string,
  filterRarity: PropTypes.string,
  filterTrunfo: PropTypes.bool,
  onInputChange: PropTypes.func,
}.isRequired;

export default Menu;
