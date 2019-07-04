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
  TabPane,
  FormFeedback
} from 'reactstrap';
import Spinner from '../loaders/spinner';
import constants from './constants';
import classnames from 'classnames';
import './auth.css';

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      loginEmail: '',
      loginPassword: '',
      signupName: '',
      signupEmail: '',
      signupPassword: ''
    };
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: process.env.REACT_APP_FACEBOOK_ID,
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

  componentDidUpdate() {
    const {
      authState: { status }
    } = this.props;
    status === constants.AUTH_SUCCESS && this.props.removeModal();
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
    window.FB.login(this.checkLoginState(), { scope: 'public_profile,email' });
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
      authState: { status, error },
      loginWithPassword,
      signUp
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
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  loginWithPassword(
                    this.state.loginEmail,
                    this.state.loginPassword
                  );
                }}
              >
                <FormGroup>
                  <Label for="email" />
                  <Input
                    invalid={status === constants.LOGIN_ERROR}
                    type="email"
                    value={this.state.loginEmail}
                    onChange={e => {
                      const { value } = e.target;
                      this.setState({
                        loginEmail: value
                      });
                    }}
                    placeholder="Enter your email"
                    required
                    title="email is required"
                  />
                  <FormFeedback>{}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                    invalid={status === constants.LOGIN_ERROR}
                    type="password"
                    value={this.state.loginPassword}
                    onChange={e => {
                      const { value } = e.target;
                      this.setState({
                        loginPassword: value
                      });
                    }}
                    placeholder="Enter your password"
                    required
                    pattern=".{3,20}"
                    title="password too short"
                  />
                  <FormFeedback>Invalid email or password</FormFeedback>
                </FormGroup>
                <div>
                  {status === constants.AUTHENTICATING ? (
                    <Spinner />
                  ) : (
                    <Button type="submit" className="btn-secondary-active">
                      Submit
                    </Button>
                  )}
                </div>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  signUp(
                    this.state.signupName,
                    this.state.signupEmail,
                    this.state.signupPassword
                  );
                }}
              >
                <FormGroup>
                  <Label for="name" />
                  <Input
                    invalid={
                      status === constants.SIGNUP_ERROR && error && error.name
                        ? true
                        : false
                    }
                    type="text"
                    placeholder="Enter your full name"
                    onChange={e => {
                      const { value } = e.target;
                      this.setState({
                        signupName: value
                      });
                    }}
                    required
                    pattern=".{3,25}"
                    title="name must be within 3 and 25 characters"
                  />
                  <FormFeedback>{error && error.message}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                    invalid={
                      status === constants.SIGNUP_ERROR && error && error.email
                        ? true
                        : false
                    }
                    type="email"
                    placeholder="Enter your email"
                    onChange={e => {
                      const { value } = e.target;
                      this.setState({
                        signupEmail: value
                      });
                    }}
                    required
                    title="email is required"
                  />
                  <FormFeedback>{error && error.message}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Input
                    invalid={
                      status === constants.SIGNUP_ERROR &&
                      error &&
                      error.password
                        ? true
                        : false
                    }
                    type="password"
                    placeholder="Enter your password"
                    onChange={e => {
                      const { value } = e.target;
                      this.setState({
                        signupPassword: value
                      });
                    }}
                    required
                    pattern=".{6,20}"
                    title="password must be 6 and 20 characters"
                  />
                  <FormFeedback>{error && error.messaging}</FormFeedback>
                </FormGroup>
                <div>
                  {status === constants.AUTHENTICATING ? (
                    <Spinner />
                  ) : (
                    <Button type="submit" className="btn-secondary-active">
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

export default AuthComponent;
