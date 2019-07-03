import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  NavbarContainer,
  Home,
  Product,
  CartContainer,
  AuthContainer,
  ErrorBoundaryComponent
} from '../app';

const App = () => (
  <Router>
    <Fragment>
      <ErrorBoundaryComponent>
        <NavbarContainer />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/cart" component={CartContainer} exact />
          <Route path="/auth/facebook" component={AuthContainer} exact />
          <Route path="/products/:productId" component={Product} exact />
        </Switch>
      </ErrorBoundaryComponent>
    </Fragment>
  </Router>
);

export default App;
