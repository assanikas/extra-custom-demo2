import React from 'react';
import logo from './logo.svg';
import './App.css';

// Import third party components
import { Switch, BrowserRouter, HashRouter, Route } from 'react-router-dom';

// Import Style
import './assets/scss/style.scss';

// Import components
import Homepage from './components/Homepage/HomePage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import TemporaryDrawer from './components/DemoSettings/DemoSettings';

function App() {
  return (
    <React.Fragment>
      <HashRouter basename='/extra-custom-demo2'>
        <Switch>

            <Route exact path='/' component={Homepage} />
            <Route exact path='/product-details' component={ProductDetails} />

        </Switch>
      </HashRouter>
      <TemporaryDrawer />
    </React.Fragment>
  );
}

export default App;
