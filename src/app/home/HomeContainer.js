import { connect } from 'react-redux';
import actions from './actions';
import HomeComponent from './HomeComponent';

const { fetchProducts } = actions;

const mapStateToProps = ({ home: { status, products } }) => {
  return { productsState: { status, products } };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: (limit, page, filter) =>
      dispatch(fetchProducts(limit, page, filter))
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default HomeContainer;
