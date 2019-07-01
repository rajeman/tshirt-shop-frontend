import axios from 'axios';
import constants from './constants';

const cartUrl = `${process.env.REACT_APP_API_URL}/shoppingCart`;

const CancelToken = axios.CancelToken;
let cancel;

const cartFetchState = (status, cartItems) => ({
  type: constants.SET_CART_FETCH_STATE,
  status,
  cartItems
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

export default { cartFetchState, fetchCart };
