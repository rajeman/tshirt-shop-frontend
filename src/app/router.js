import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavbarComponent, Home, Product, CartContainer } from '../app';

const App = () => (
  <Router>
    <Fragment>
      <NavbarComponent />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={CartContainer} exact />
        <Route path="/products/:productId" component={Product} exact />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
