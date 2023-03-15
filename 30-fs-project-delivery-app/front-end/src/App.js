import React from 'react';
import Router from './pages/router';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
