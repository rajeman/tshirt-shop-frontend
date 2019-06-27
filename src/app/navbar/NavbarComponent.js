import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './navbar.css';
import tshirtshop from '../assets/tshirtshop.png';

export default class NavbarComponent extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar navbar-light bg-dark">
          <NavbarBrand href="/" className="mr-auto">
            <span className="text-info d-inline-block navbar-brand-img-cont">
              <img className="navbar-brand-img" src={tshirtshop} alt="Logo" />
            </span>
          </NavbarBrand>
          <Nav>
            <NavItem className="color-primary">
              <NavLink href="#" className="d-inline-block pr-1">
                <span className="color-primary small">Sign In</span>
              </NavLink>
              |
            </NavItem>

            <NavItem>
              <NavLink href="#" className="d-inline-block pl-1">
                <span className="color-primary small">Login</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
