import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

function AppProvider({ children }) {
  const [userData, setUserData] = useState({});

  const context = useMemo(() => ({ userData, setUserData }), []);

  return (
    <appContext.Provider value={ context }>
      {children}
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
