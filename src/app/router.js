import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {
  NavbarContainer,
  Home,
  Product,
  CartContainer,
  OrderContainer,
  isAuthenticated,
  NotFoundComponent,
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
          <Route
            path="/orders"
            render={() =>
              isAuthenticated() ? <OrderContainer /> : <Redirect to="/" />
            }
            exact
          />
          <Route path="/products/:productId" component={Product} exact />
          <Route path="*" component={NotFoundComponent} exact />
        </Switch>
      </ErrorBoundaryComponent>
    </Fragment>
  </Router>
);

export default App;
