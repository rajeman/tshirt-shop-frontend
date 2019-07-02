import { connect } from 'react-redux';
import actions from './actions';
import CartComponent from './CartComponent';

const { fetchCart, updateCart } = actions;

const mapStateToProps = ({ cart: { status, cart } }) => {
  return { cartState: { status, cart } };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: cartId => dispatch(fetchCart(cartId)),
    updateCart: item => dispatch(updateCart(item))
  };
};

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);

export default CartContainer;
