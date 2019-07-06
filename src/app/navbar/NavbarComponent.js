import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
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
      showAuthForm: false,
      dropdownOpen: false
    };
    this.toggleAuthForm = this.toggleAuthForm.bind(this);
    this.removeModal = this.removeModal.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
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

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { showAuthForm } = this.state;
    const userName = localStorage.getItem(constants.USER_NAME);
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
                  <span className="color-primary small">Sign Up</span>
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
                <Dropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropdown}
                  className="mr-2"
                >
                  <DropdownToggle caret>{userName}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag="a" href="/orders">
                      My Orders
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={() => {
                        localStorage.removeItem(constants.USER_NAME);
                        localStorage.removeItem(constants.BEARER_TOKEN);

                        if (window.FB) {
                          window.FB.logout(response => {});
                        }
                        this.props.dispatch(authState('', {}));
                      }}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </Nav>
          )}
        </Navbar>
        {showAuthForm && <AuthContainer removeModal={this.removeModal} />}
      </div>
    );
  }
}
