import axios from 'axios';
import uniqid from 'uniqid';
import { toast } from 'react-toastify';

import constants from './constants';

const cartUrl = `${process.env.REACT_APP_API_URL}/shoppingCart`;

const CancelToken = axios.CancelToken;
let cancel;

const cartFetchState = (status, cartItems) => ({
  type: constants.SET_CART_FETCH_STATE,
  status,
  cartItems
});

const cartAddState = status => ({
  type: constants.SET_CART_ADD_STATE,
  status
});

const cartUpdateState = status => ({
  type: constants.SET_CART_UPDATE_STATE,
  status
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
        cart: response.data,
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
  dispatch(cartUpdateState(constants.CART_UPDATING));
  try {
    await axios.put(`${cartUrl}/update/${item.itemId}`, {
      quantity: parseInt(item.quantity)
    });
    dispatch(cartUpdateState(constants.CART_UPDATE_SUCCESS));
    toast.success('Product updated', {
      position: toast.POSITION.TOP_RIGHT
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred';
    dispatch(cartUpdateState(constants.CART_UPDATE_ERROR));
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT
    });
  } finally {
    dispatch(fetchCart(localStorage.getItem(constants.CART_ID)));
  }
};

export default { cartFetchState, fetchCart, addToCart, updateCart };
