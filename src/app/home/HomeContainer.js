import { connect } from 'react-redux';
import actions from './actions';
import HomeComponent from './HomeComponent';

const { fetchProducts } = actions;

const mapStateToProps = ({ home: { status, products }, cart }) => {
  return {
    productsState: { status, products },
    cartState: {
      status: cart.status
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: (limit, page, filter, word) =>
      dispatch(fetchProducts(limit, page, filter, word))
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default HomeContainer;
