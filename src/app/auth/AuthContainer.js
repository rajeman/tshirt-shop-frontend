import { connect } from 'react-redux';
import actions from './actions';
import FacebookLoginComponent from './FacebookLoginComponent';

const { loginWithFacebook } = actions;

const mapStateToProps = ({ auth: { status, user } }) => {
  return { authState: { status, user } };
};

const mapDispatchToProps = dispatch => {
  return {
    loginWithFacebook: accessToken => dispatch(loginWithFacebook(accessToken))
  };
};

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookLoginComponent);

export default AuthContainer;
