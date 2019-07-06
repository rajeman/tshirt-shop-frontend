import axios from 'axios';
import uniqid from 'uniqid';
import { toast } from 'react-toastify';

import constants from './constants';

const cartUrl = `${process.env.REACT_APP_API_URL}/shoppingCart`;
const ordersUrl = `${process.env.REACT_APP_API_URL}/orders`;

const CancelToken = axios.CancelToken;
let cancel;
let cancelUpdate;

const cartFetchState = (status, cartItems) => ({
  type: constants.SET_CART_FETCH_STATE,
  status,
  cartItems
});

const cartAddState = status => ({
  type: constants.SET_CART_ADD_STATE,
  status
});

const cartItemState = (status, cartItem) => ({
  type: constants.SET_CART_ITEM_STATE,
  status,
  cartItem
});

const cartDeleteState = (status, itemId) => ({
  type: constants.SET_CART_DELETE_STATE,
  status,
  itemId
});

const createOrderState = (status, orderId) => ({
  type: constants.CREATE_SALE_ORDER_STATE,
  createOrderStatus: status,
  orderId
});

const fetchCart = cartId => async dispatch => {
  dispatch(
    cartFetchState(constants.CART_FETCHING, {
      cart: undefined
    })
  );
  cancel && cancel();
  try {
    const response = await axios.get(`${cartUrl}/${cartId}`, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    });
    dispatch(
      cartFetchState(constants.CART_FETCH_SUCCESS, {
        cart: response.data.sort((a, b) => {
          return parseInt(a.item_id - parseInt(b.item_id));
        }),
        cartId
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const addToCart = product => async dispatch => {
  dispatch(cartAddState(constants.CART_ADDING));
  let cartId = localStorage.getItem(constants.CART_ID);
  if (!cartId) {
    cartId = uniqid();
    localStorage.setItem(constants.CART_ID, cartId);
  }
  try {
    await axios.post(`${cartUrl}/add`, {
      cart_id: cartId,
      product_id: parseInt(product.productId),
      attributes: product.attributes
    });
    dispatch(cartAddState(constants.CART_ADD_SUCCESS));
    toast.success('Product added to cart', {
      position: toast.POSITION.TOP_RIGHT
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
    dispatch(cartAddState(constants.CART_ADD_ERROR));
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};

const updateCart = item => async dispatch => {
  cancelUpdate && cancelUpdate();
  try {
    const response = await axios.put(
      `${cartUrl}/update/${item.itemId}`,
      {
        quantity: parseInt(item.quantity)
      },
      {
        cancelToken: new CancelToken(function executor(c) {
          cancelUpdate = c;
        })
      }
    );
    const updatedItem = response.data.filter(
      newItem => newItem.item_id === item.itemId
    );
    dispatch(cartItemState(constants.CART_FETCH_SUCCESS, updatedItem[0]));
  } catch (error) {
    console.log(error);
  }
};

const deleteCartItem = itemId => async dispatch => {
  cancelUpdate && cancelUpdate();
  try {
    await axios.delete(`${cartUrl}/removeProduct/${itemId}`);
    dispatch(cartDeleteState(constants.CART_FETCH_SUCCESS, itemId));
  } catch (error) {
    console.log(error);
  }
};

const createOrder = () => async dispatch => {
  dispatch(createOrderState(constants.CREATING_ORDER, { orderId: undefined }));
  const cartId = localStorage.getItem(constants.CART_ID);
  try {
    const response = await axios.post(
      `${ordersUrl}`,
      {
        cart_id: cartId,
        shipping_id: 1,
        tax_id: 1
      },
      {
        headers: {
          'USER-KEY': `Bearer ${localStorage.getItem('BEARER_TOKEN')}`
        }
      }
    );
    dispatch(
      createOrderState(constants.CREATE_ORDER_SUCCESS, {
        orderId: response.data.orderId
      })
    );
    localStorage.removeItem(constants.CART_ID);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('BEARER_TOKEN');
      localStorage.removeItem('USER_NAME');
    }

    dispatch(
      createOrderState(constants.CREATE_ORDER_ERROR, {
        orderId: undefined
      })
    );
    toast.error('Error creating order', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};

export default {
  cartFetchState,
  fetchCart,
  addToCart,
  updateCart,
  deleteCartItem,
  createOrder
};
