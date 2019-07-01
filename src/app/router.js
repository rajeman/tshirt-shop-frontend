import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavbarComponent, Home, Product, CartComponent } from '../app';

const App = () => (
  <Router>
    <Fragment>
      <NavbarComponent />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/products/:productId" component={Product} exact />
        <Route path="/cart" component={CartComponent} exact />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
