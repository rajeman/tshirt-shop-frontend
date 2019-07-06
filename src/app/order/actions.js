import axios from 'axios';
import { toast } from 'react-toastify';
import constants from './constants';

const ordersUrl = `${process.env.REACT_APP_API_URL}/orders`;
const stripeUrl = `${process.env.REACT_APP_API_URL}/stripe`;

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

const paymentState = status => ({
  type: constants.SET_PAYMENT_STATE,
  paymentStatus: status
});

const updatePaidOrder = orderId => ({
  type: constants.UPDATE_PAID_ORDER,
  orderId
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
    error.response &&
      error.response.status === 401 &&
      localStorage.removeItem('BEARER_TOKEN');
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
    error.response &&
      error.response.status === 401 &&
      localStorage.removeItem('BEARER_TOKEN');
    dispatch(singleOrderState(constants.SINGLE_ORDER_FETCH_ERROR, undefined));
  }
};

const makePayment = (stripeToken, orderId, amount) => async dispatch => {
  dispatch(paymentState(constants.PAYMENT_PROCESSING));
  try {
    await axios.post(
      `${stripeUrl}/charge`,
      {
        stripeToken,
        order_id: orderId,
        amount: parseInt(amount),
        description: 'Payment for goods at rajeman tshirt-shop'
      },
      {
        headers: {
          'USER-KEY': `Bearer ${localStorage.getItem('BEARER_TOKEN')}`
        }
      }
    );
    dispatch(paymentState(constants.PAYMENT_PROCESS_SUCCESS));
    dispatch(updatePaidOrder(orderId));
  } catch (error) {
    dispatch(paymentState(constants.PAYMENT_PROCESS_ERROR));
    console.log(error);
    toast.error('Error making payment', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};

export default { fetchOrders, fetchSingleOrder, makePayment, paymentState };
