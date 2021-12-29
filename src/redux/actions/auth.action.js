import {actionAuth} from '../constants/constants';
// import axios from 'axios';
import api from '../../api/index';

//Register
export const register = (username, phonenumber, password) => async dispatch => {
  try {
    await api
      .post('users/register', {
        username: username,
        phonenumber: phonenumber,
        password: password,
      })
      .then(res => {
        dispatch({
          type: actionAuth.SIGNUP_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: actionAuth.SIGNUP_FAILURE,
          payload: err.response.data,
        });
      });
  } catch (error) {
    console.log('xx', error);
  }
};

// Login
export const login = (phonenumber, password) => async dispatch => {
  try {
    await api
      .post('users/login', {
        phonenumber: phonenumber,
        password: password,
      })
      .then(res =>
        dispatch({
          type: actionAuth.LOGIN_SUCCESS,
          payload: res.data,
        }),
      )
      .catch(err =>
        dispatch({
          type: actionAuth.LOGIN_FAILURE,
          payload: err.response.data,
        }),
      );
  } catch (error) {
    console.log('xx', error.message);
  }
};

//remove error
export const removeError = () => async dispatch => {
  dispatch({
    type: actionAuth.REMOVE_ERROR,
  });
};

// change password
export const changeToken = newToken => async dispatch => {
  dispatch({
    type: actionAuth.CHANGE_TOKEN,
    payload: newToken,
  });
};

// log out
export const logout = () => async dispatch => {
  dispatch({
    type: actionAuth.LOGOUT,
  });
};

// block inbox
export const blockUser = (token, userId, type) => async dispatch => {
  try {
    await api
      .post(
        'users/set-block-user',
        {
          user_id: userId,
          type: type,
        },
        {headers: {authorization: `Bearer ${token}`}},
      )
      .then(res => {
        dispatch({
          type: actionAuth.BLOCK_INBOX,
          payload: res.data,
        });
      })
      .catch(err => {
        // dispatch({
        //     type: actionAuth.GET_ERROR,
        //     payload: err.response.data,
        //   })
      });
  } catch (error) {
    console.log('xx', error.message);
  }
};
