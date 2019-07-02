import { connect } from 'react-redux';
import actions from './actions';
import cartActions from '../cart/actions';
import ProductComponent from './ProductComponent';

const { fetchProduct } = actions;
const { addToCart } = cartActions;

const mapStateToProps = ({ product: { status, product }, cart }) => {
  return {
    productState: { status, product },
    cartState: {
      status: cart.status
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId)),
    addToCart: product => dispatch(addToCart(product))
  };
};

const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent);

export default ProductContainer;
