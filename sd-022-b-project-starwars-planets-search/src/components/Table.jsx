import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    planets,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(StarWarsContext);

  // --------- Requisito 4 ---------
  const [planetsToRender, setPlanetsToRender] = useState(planets);
  // -------------------------------

  // --------- Requisito 2 ---------
  function handleChangeNameFilter(event) {
    const { value } = event.target;
    setFilterByName({ name: value });
  }

  function filterPlanetsByName() {
    const filteredPlanets = planetsToRender
      .filter((planet) => planet.name.toLowerCase()
        .includes(filterByName.name.toLowerCase()));

    return filteredPlanets;
  } // -----------------------------

  // --------- Requisito 3 ---------
  const [localNumericFilters, setLocalNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  function handleChangeNumericFilters(event) {
    const { name, value } = event.target;

    setLocalNumericFilters({
      ...localNumericFilters,
      [name]: value,
    });
  }

  function filterPlanetsByNumbers(createdFilters, _hasDeletedFilter) {
    const planetsToFilter = _hasDeletedFilter ? planets : planetsToRender;

    createdFilters.forEach(({ column, comparison, value }) => {
      const filteredPlanets = planetsToFilter.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return (Number(planet[column]) > Number(value));
        case 'menor que':
          return (Number(planet[column]) < Number(value));
        case 'igual a':
          return (Number(planet[column]) === Number(value));
        default:
          return planets;
        }
      });
      setPlanetsToRender(filteredPlanets);
    });
  } // -----------------------------

  // --------- Requisito 4 ---------
  useEffect(() => {
    setPlanetsToRender(planets);
  }, [planets]); // componentDidUpdate

  useEffect(() => {
    filterPlanetsByNumbers(filterByNumericValues);
  }, [filterByNumericValues]); // componentDidUpdate
  // -------------------------------

  // --------- Requisito 6 ---------
  // Logica construída com ajuda do Daniel Gomes
  const columnOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [columnFilterOptions, setColumnFilterOptions] = useState(columnOptions);

  function handleColumnFilterOptions() {
    const filteredOptions = columnFilterOptions
      .filter((filter) => filter !== localNumericFilters.column);

    setColumnFilterOptions(filteredOptions);

    setLocalNumericFilters({
      ...localNumericFilters,
      column: filteredOptions[0],
    });
  } // -----------------------------

  // --------- Requisito 7 ---------
  function handleDeleteFilterClick(event) {
    const { name } = event.target;

    const remainingFilters = filterByNumericValues
      .filter((filter) => filter.column !== name);

    setPlanetsToRender(planets);
    setFilterByNumericValues(remainingFilters);
    setColumnFilterOptions([...columnFilterOptions, name]);
    filterPlanetsByNumbers(remainingFilters, true);
  }

  function handleDeleteAllClick() {
    setFilterByNumericValues([]);
    setPlanetsToRender(planets);
    setColumnFilterOptions(columnOptions);
  } // -----------------------------

  function handleFilterClick() {
    setFilterByNumericValues([...filterByNumericValues, localNumericFilters]);
    filterPlanetsByNumbers(filterByNumericValues);
    handleColumnFilterOptions();
  }

  return (
    <fieldset>
      <legend>Table</legend>
      <fieldset>
        <legend>Name Filter</legend>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Planet name"
          name="name"
          value={ filterByName.name }
          onChange={ handleChangeNameFilter }
        />
      </fieldset>
      <fieldset>
        <legend>Numeric Filters</legend>
        <select
          data-testid="column-filter"
          name="column"
          value={ localNumericFilters.column }
          onChange={ handleChangeNumericFilters }
        >
          { columnFilterOptions.map((filter) => (
            <option key={ filter } value={ filter }>{filter}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ localNumericFilters.comparison }
          onChange={ handleChangeNumericFilters }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          placeholder="Value filter"
          name="value"
          value={ localNumericFilters.value }
          onChange={ handleChangeNumericFilters }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterClick }
        >
          filter
        </button>
      </fieldset>
      <fieldset>
        <legend>Created Filters</legend>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleDeleteAllClick }
        >
          Remove filters
        </button>
        {filterByNumericValues.map((filter, index) => (
          <p
            key={ index }
            data-testid="filter"
          >
            <button
              type="button"
              name={ filter.column }
              onClick={ (event) => handleDeleteFilterClick(event) }
            >
              Delete
            </button>
            {` ${filter.column} ${filter.comparison} ${filter.value} `}
          </p>
        ))}
      </fieldset>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanetsByName().map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </fieldset>
  );
}

export default Table;
