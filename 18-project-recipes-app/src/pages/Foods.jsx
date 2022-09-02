import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Foods" />
      <Recipes type="meals" />
      <Footer />
    </div>
  );
}

export default Foods;
