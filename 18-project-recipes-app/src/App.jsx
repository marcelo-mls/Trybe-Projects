import React from 'react';
import './App.css';
import './styles/styles.css';
import Routes from './components/Routes';
import Provider from './Context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
