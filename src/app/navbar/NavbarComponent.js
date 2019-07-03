import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import AuthContainer from '../auth/AuthContainer';
import './navbar.css';
import tshirtshop from '../assets/tshirtshop.png';
import constants from '../auth/constants';
import authActions from '../auth/actions';

const { authState } = authActions;

export default class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthForm: false
    };
    this.toggleAuthForm = this.toggleAuthForm.bind(this);
    this.removeModal = this.removeModal.bind(this);
  }

  toggleAuthForm() {
    this.setState({
      showAuthForm: !this.state.showAuthForm
    });
  }

  removeModal() {
    this.setState({
      showAuthForm: false
    });
  }

  render() {
    const { showAuthForm } = this.state;
    const userName = localStorage.getItem(constants.USER_NAME);
    // this.fuckup.donothing();
    return (
      <div>
        <Navbar className="navbar navbar-light bg-dark">
          <NavbarBrand href="/" className="mr-auto">
            <span className="text-info d-inline-block navbar-brand-img-cont">
              <img className="navbar-brand-img" src={tshirtshop} alt="Logo" />
            </span>
          </NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink href="/cart" className="d-inline-block pl-1">
                <i className="fas fa-cart-plus" />
              </NavLink>
            </NavItem>
          </Nav>

          {!userName ? (
            <Nav>
              <NavItem className="color-primary">
                <NavLink
                  href="#"
                  className="d-inline-block pr-1"
                  onClick={this.toggleAuthForm}
                >
                  <span className="color-primary small">Sign In</span>
                </NavLink>
                |
              </NavItem>

              <NavItem>
                <NavLink
                  href="#"
                  className="d-inline-block pl-1"
                  onClick={this.toggleAuthForm}
                >
                  <span className="color-primary small">Login</span>
                </NavLink>
              </NavItem>
            </Nav>
          ) : (
            <Nav>
              <NavItem>
                <NavLink>
                  <span className="text-light mr-1">{userName}</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  className="d-inline-block pl-1"
                  onClick={() => {
                    localStorage.removeItem(constants.USER_NAME);
                    localStorage.removeItem(constants.BEARER_TOKEN);

                    if (window.FB) {
                      window.FB.logout(response => {
                        console.log('logged out');
                      });
                    }
                    this.props.dispatch(authState('', {}));
                  }}
                >
                  <span className="color-primary small">Logout</span>
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Navbar>
        {showAuthForm && <AuthContainer removeModal={this.removeModal} />}
      </div>
    );
  }
}
