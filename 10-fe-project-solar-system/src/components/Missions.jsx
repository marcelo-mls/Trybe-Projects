import React from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends React.Component {
  render() {
    const arrOfMissions = missions.map((mission, index) => (<MissionCard
      name={ mission.name }
      year={ mission.year }
      country={ mission.country }
      destination={ mission.destination }
      key={ index }
    />));

    return (
      <div data-testid="missions">
        <Title headline="Missões" />
        { arrOfMissions }
      </div>
    );
  }
}

export default Missions;
