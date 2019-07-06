import { connect } from 'react-redux';
import OrderComponent from './OrderComponent';
import actions from './actions';

const { fetchOrders, fetchSingleOrder, makePayment, paymentState } = actions;

const mapStateToProps = ({
  order: { status, order, singleOrderStatus, singleOrder, paymentStatus }
}) => {
  return {
    order: { status, order, singleOrder, singleOrderStatus, paymentStatus }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId)),
    makePayment: (stripeToken, orderId, amount) =>
      dispatch(makePayment(stripeToken, orderId, amount)),
    paymentState: status => dispatch(paymentState(status))
  };
};

const OrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderComponent);

export default OrderContainer;
