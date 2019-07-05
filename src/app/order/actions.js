import axios from 'axios';
import constants from './constants';

const ordersUrl = `${process.env.REACT_APP_API_URL}/orders`;

const orderState = (status, order) => ({
  type: constants.SET_ORDER_STATE,
  status,
  order
});

const singleOrderState = (status, order) => ({
  type: constants.SET_SINGLE_ORDER_STATE,
  singleOrderStatus: status,
  singleOrder: order
});

const fetchOrders = () => async dispatch => {
  dispatch(
    orderState(constants.ORDERS_FETCHING, {
      order: undefined
    })
  );
  try {
    const response = await axios.get(`${ordersUrl}/inCustomer`, {
      headers: { 'USER-KEY': `Bearer ${localStorage.getItem('BEARER_TOKEN')}` }
    });
    const orders = response.data;
    dispatch(orderState(constants.ORDERS_FETCH_SUCCESS, orders));
  } catch (error) {
    console.log(error);
    dispatch(orderState(constants.ORDERS_FETCH_ERROR, undefined));
  }
};

const fetchSingleOrder = orderId => async dispatch => {
  dispatch(
    singleOrderState(constants.SINGLE_ORDER_FETCHING, {
      order: undefined
    })
  );
  try {
    const response = await axios.get(`${ordersUrl}/${orderId}`, {
      headers: { 'USER-KEY': `Bearer ${localStorage.getItem('BEARER_TOKEN')}` }
    });
    const orders = response.data;
    dispatch(singleOrderState(constants.SINGLE_ORDER_FETCH_SUCCESS, orders));
  } catch (error) {
    console.log(error);
    dispatch(singleOrderState(constants.SINGLE_ORDER_FETCH_ERROR, undefined));
  }
};

export default { fetchOrders, fetchSingleOrder };
