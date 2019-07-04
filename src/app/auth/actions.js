import axios from 'axios';
import constants from './constants';

const customersUrl = `${process.env.REACT_APP_API_URL}/customers`;

const authState = (status, user, error) => ({
  type: constants.SET_AUTH_STATE,
  status,
  user,
  error
});

const loginWithFacebook = accessToken => async dispatch => {
  dispatch(
    authState(constants.AUTHENTICATING, {
      user: undefined
    })
  );
  try {
    const response = await axios.post(`${customersUrl}/facebook`, {
      access_token: accessToken
    });
    const token = response.data.accessToken.split(' ')[1];
    localStorage.setItem(constants.BEARER_TOKEN, token);
    localStorage.setItem(constants.USER_NAME, response.data.customer.name);
    dispatch(
      authState(constants.AUTH_SUCCESS, {
        ...response.data.customer
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const loginWithPassword = (email, password) => async dispatch => {
  dispatch(
    authState(constants.AUTHENTICATING, {
      user: undefined
    })
  );
  try {
    const response = await axios.post(`${customersUrl}/login`, {
      email,
      password
    });
    const token = response.data.accessToken.split(' ')[1];
    localStorage.setItem(constants.BEARER_TOKEN, token);
    localStorage.setItem(constants.USER_NAME, response.data.customer.name);
    dispatch(
      authState(constants.AUTH_SUCCESS, {
        ...response.data.customer
      })
    );
  } catch (error) {
    dispatch(
      authState(constants.LOGIN_ERROR, {
        user: undefined
      })
    );
  }
};

const signUp = (name, email, password) => async dispatch => {
  dispatch(
    authState(constants.AUTHENTICATING, {
      user: undefined
    })
  );
  try {
    const response = await axios.post(`${customersUrl}/`, {
      name,
      email,
      password
    });
    const token = response.data.accessToken.split(' ')[1];
    localStorage.setItem(constants.BEARER_TOKEN, token);
    localStorage.setItem(constants.USER_NAME, response.data.customer.name);
    dispatch(
      authState(constants.AUTH_SUCCESS, {
        ...response.data.customer
      })
    );
  } catch (error) {
    const authError = error.response && error.response.data;
    dispatch(
      authState(
        constants.SIGNUP_ERROR,
        {
          user: undefined
        },
        {
          ...authError
        }
      )
    );
  }
};

export default { loginWithFacebook, authState, loginWithPassword, signUp };
