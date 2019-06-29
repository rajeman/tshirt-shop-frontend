import axios from 'axios';
import constants from './constants';

const productsUrl = `${process.env.REACT_APP_API_URL}/products`;

const productsState = (status, products) => ({
  type: constants.SET_PRODUCTS_STATE,
  status,
  products
});

const fetchProducts = (
  limit,
  page,
  filter = constants.FILTER_NONE
) => async dispatch => {
  let urlPath;
  switch (filter) {
    case constants.FILTER_SEARCH: {
      urlPath = '/search';
      break;
    }
    case constants.FILTER_DEPARTMENT_REGIONAL: {
      urlPath = `/inDepartment/1/`;
      break;
    }
    case constants.FILTER_CATEGORY_FRENCH: {
      urlPath = `/inCategory/1/`;
      break;
    }
    case constants.FILTER_CATEGORY_ITALIAN: {
      urlPath = `/inCategory/2/`;
      break;
    }
    case constants.FILTER_CATEGORY_IRISH: {
      urlPath = `/inCategory/3/`;
      break;
    }
    case constants.FILTER_DEPARTMENT_NATURE: {
      urlPath = `/inDepartment/2/`;
      break;
    }
    case constants.FILTER_CATEGORY_ANIMAL: {
      urlPath = `/inCategory/4/`;
      break;
    }
    case constants.FILTER_CATEGORY_FLOWER: {
      urlPath = `/inCategory/5/`;
      break;
    }
    case constants.FILTER_DEPARTMENT_SEASONAL: {
      urlPath = `/inDepartment/3/`;
      break;
    }
    case constants.FILTER_CATEGORY_CHRISTMAS: {
      urlPath = `/inCategory/6/`;
      break;
    }
    case constants.FILTER_CATEGORY_VALENTINE: {
      urlPath = `/inCategory/7/`;
      break;
    }
    default: {
      urlPath = '/';
    }
  }
  dispatch(
    productsState(constants.PRODUCTS_FETCHING, {
      page,
      products: {}
    })
  );
  try {
    const response = await axios.get(
      `${productsUrl}${urlPath}?limit=${limit}&page=${page}`
    );
    dispatch(
      productsState(constants.PRODUCTS_FETCH_SUCCESS, {
        page,
        filter,
        products: response.data
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export default { productsState, fetchProducts };
