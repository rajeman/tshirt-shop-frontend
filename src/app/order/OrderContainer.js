import { connect } from 'react-redux';
import OrderComponent from './OrderComponent';
import actions from './actions';

const { fetchOrders, fetchSingleOrder } = actions;

const mapStateToProps = ({
  order: { status, order, singleOrderStatus, singleOrder }
}) => {
  return { order: { status, order, singleOrderStatus, singleOrder } };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId))
  };
};

const OrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderComponent);

export default OrderContainer;
