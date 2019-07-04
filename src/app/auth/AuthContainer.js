import { connect } from 'react-redux';
import actions from './actions';
import AuthComponent from './AuthComponent';

const { loginWithFacebook, loginWithPassword, signUp } = actions;

const mapStateToProps = ({ auth: { status, user, error } }) => {
  return { authState: { status, user, error } };
};

const mapDispatchToProps = dispatch => {
  return {
    loginWithFacebook: accessToken => dispatch(loginWithFacebook(accessToken)),
    loginWithPassword: (email, password) =>
      dispatch(loginWithPassword(email, password)),
    signUp: (name, email, password) => dispatch(signUp(name, email, password))
  };
};

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);

export default AuthContainer;
