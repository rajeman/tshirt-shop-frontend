import axios from 'axios';
import constants from './constants';

const customersUrl = `${process.env.REACT_APP_API_URL}/customers`;

const authState = (status, user) => ({
  type: constants.SET_AUTH_STATE,
  status,
  user
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
    console.log(response);
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

export default { loginWithFacebook, authState };
