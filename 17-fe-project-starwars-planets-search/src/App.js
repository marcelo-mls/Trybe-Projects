import React from 'react';
import './App.css';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <h2>Project Star Wars Planets Search</h2>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
