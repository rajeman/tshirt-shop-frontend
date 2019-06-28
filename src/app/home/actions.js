import axios from 'axios';
import constants from './constants';

const productsUrl = `${process.env.REACT_APP_API_URL}/products`;

const productsState = (status, products) => ({
  type: constants.SET_PRODUCTS_STATE,
  status,
  products
});

const fetchProducts = (limit, page) => async dispatch => {
  dispatch(
    productsState(constants.PRODUCTS_FETCHING, {
      page,
      products: {}
    })
  );
  try {
    const response = await axios.get(
      `${productsUrl}/?limit=${limit}&page=${page}`
    );
    dispatch(
      productsState(constants.PRODUCTS_FETCH_SUCCESS, {
        page,
        products: response.data
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export default { productsState, fetchProducts };
