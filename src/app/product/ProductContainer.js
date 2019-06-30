import { connect } from 'react-redux';
import actions from './actions';
import ProductComponent from './ProductComponent';

const { fetchProduct } = actions;

const mapStateToProps = ({ product: { status, product } }) => {
  return { productState: { status, product } };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId))
  };
};

const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent);

export default ProductContainer;
