import { connect } from 'react-redux';
import NavbarComponent from './NavbarComponent';

const mapStateToProps = ({ auth: { status, user } }) => {
  return { authState: { status, user } };
};

const NavbarContainer = connect(mapStateToProps)(NavbarComponent);

export default NavbarContainer;
