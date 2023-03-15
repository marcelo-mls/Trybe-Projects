import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import Cart from './pages/Cart';
import { getCategories } from './services/api';
import ProductDetails from './pages/ProductDetails';
import './App.css';

class App extends React.Component {
  state = {
    categoriesList: [],
    productDetails: [],
  }

  componentDidMount() {
    this.callGetCategories();
  }

  callGetCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
    });
  }

  handleClick = (event) => {
    this.setState((prevState) => ({
      productDetails: [...prevState.productDetails, event] }));
  }

  render() {
    const { categoriesList, productDetails } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={ (props) => (<ProductsList
              { ...props }
              categoriesList={ categoriesList }
              onClick={ this.handleClick }
            />) }
          />
          <Route
            path="/product-details/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              onClick={ this.handleClick }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              productDetails={ productDetails }
            />) }
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
