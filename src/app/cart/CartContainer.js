import { connect } from 'react-redux';
import actions from './actions';
import singleOrderActions from '../order/actions';
import CartComponent from './CartComponent';

const { fetchCart, updateCart, deleteCartItem, createOrder } = actions;
const { fetchSingleOrder, makePayment, paymentState } = singleOrderActions;

const mapStateToProps = ({
  cart: { status, cart, createOrderStatus, orderId },
  order: { singleOrderStatus, singleOrder, paymentStatus },
  auth
}) => {
  return {
    cartState: {
      status,
      cart,
      createOrderStatus,
      orderId
    },
    singleOrderState: { singleOrderStatus, singleOrder, paymentStatus },
    authState: { authStatus: auth.status }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: cartId => dispatch(fetchCart(cartId)),
    updateCart: item => dispatch(updateCart(item)),
    deleteCartItem: itemId => dispatch(deleteCartItem(itemId)),
    fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId)),
    createOrder: () => dispatch(createOrder()),
    makePayment: (stripeToken, orderId, amount) =>
      dispatch(makePayment(stripeToken, orderId, amount)),
    paymentState: status => dispatch(paymentState(status))
  };
};

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);

export default CartContainer;
