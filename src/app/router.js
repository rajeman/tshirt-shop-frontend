import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavbarComponent, Home, Product } from '../app';

const App = () => (
  <Router>
    <Fragment>
      <NavbarComponent />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:productId" component={Product} exact />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
