/* eslint-disable no-undef */
import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import Spinner from '../loaders/spinner';
import constants from './constants';
import classnames from 'classnames';
import './auth.css';

class FacebookLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: 446270662825214,
        cookie: true,
        xfbml: true,
        version: 'v3.3'
      });

      FB.Event.subscribe(
        'auth.statusChange',
        function(response) {
          if (response.authResponse) {
            const { loginWithFacebook } = this.props;
            loginWithFacebook(response.authResponse.accessToken);
            this.props.removeModal();
          } else {
            // console.log(
            //   '---->User cancelled login or did not fully authorize.'
            // );
          }
        }.bind(this)
      );
    }.bind(this);
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.3';

      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      // console.log('connected');
    } else if (response.status === 'not_authorized') {
      // console.log('please log in to this app using facebook');
    } else {
      // console.log('please log in');
    }
  }

  checkLoginState() {
    window.FB.getLoginStatus(
      function(response) {
        this.statusChangeCallback(response);
      }.bind(this),
      true
    );
  }

  handleClick() {
    window.FB.login(this.checkLoginState());
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const {
      authState: { status }
    } = this.props;
    return (
      <Modal isOpen={true}>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                Signup
              </NavLink>
            </NavItem>
            <i
              className="fas fa-times ml-auto"
              onClick={this.props.removeModal}
            />
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Form>
                <FormGroup>
                  <Label for="email" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    required
                    title="email is required"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                    pattern=".{3,16}"
                    title="password must be within 3 and 16 characters"
                  />
                </FormGroup>
                <div>
                  {status === constants.AUTHENTICATING ? (
                    <Spinner />
                  ) : (
                    <Button
                      type="submit"
                      className="btn-secondary-active"
                      onClick={e => {
                        // e.preventDefault();
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form>
                <FormGroup>
                  <Label for="name" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    required
                    pattern=".{3,25}"
                    title="name must be within 3 and 25 characters"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    required
                    title="email is required"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                    pattern=".{3,16}"
                    title="password must be within 3 and 16 characters"
                  />
                </FormGroup>
                <div>
                  {status === constants.AUTHENTICATING ? (
                    <Spinner />
                  ) : (
                    <Button
                      type="submit"
                      className="btn-secondary-active"
                      onClick={e => {
                        // e.preventDefault();
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </Form>
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter className="flex-column justify-content-start align-items-start">
          <div>
            {' '}
            <span className="text-muted extra-login-text">
              Use another service to login
            </span>
          </div>
          {
            <div className="mt-2">
              <i className="fab fa-facebook" onClick={this.handleClick} />
            </div>
          }
        </ModalFooter>
      </Modal>
    );
  }
}

export default FacebookLoginComponent;
