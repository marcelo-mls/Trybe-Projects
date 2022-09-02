import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchAPI from '../services/fetchAPI';

function StarWarsProvider(props) {
  const { children } = props;

  // --------- Requisito 2 ---------
  const [filterByName, setFilterByName] = useState({ name: '' });
  // -------------------------------

  // --------- Requisito 3 ---------
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  // -------------------------------

  // --------- Requisito 1 ---------
  const [planets, setPlanets] = useState([]);

  async function getPlanets() {
    const fetchPlanets = await fetchAPI();
    setPlanets(fetchPlanets);
  }

  useEffect(() => {
    getPlanets();
  }, []); // componentDidMount
  // -------------------------------

  const context = {
    planets,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;
