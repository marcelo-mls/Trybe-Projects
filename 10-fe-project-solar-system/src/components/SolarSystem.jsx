import React from 'react';
import Title from './Title';
import Planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends React.Component {
  render() {
    const arrOfPlanets = Planets.map((planet, index) => (<PlanetCard
      planetName={ planet.name }
      planetImage={ planet.image }
      key={ index }
    />));

    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        { arrOfPlanets }
      </div>
    );
  }
}

export default SolarSystem;
