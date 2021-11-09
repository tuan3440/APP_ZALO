import {actionAuth} from '../constants/constants';
// import axios from 'axios';
import api from '../../api/index';

//Register
export const register = (username, phonenumber, password) => async dispatch => {
  try {
    await api.post('users/register', {
      username: username,
      phonenumber: phonenumber,
      password: password,
    }).then(res => {
      dispatch({
        type: actionAuth.SIGNUP_SUCCESS,
        payload: res.data,
      })
    }
    ).catch(err => {
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
     await api.post("users/login", {
      phonenumber: phonenumber,
      password : password
    }).then(res =>
      dispatch({
        type: actionAuth.LOGIN_SUCCESS,
        payload: res.data,
      })
    ).catch(err => 
      dispatch({
        type: actionAuth.LOGIN_FAILURE,
        payload: err.response.data,
      })
    )
  } catch (error) {
    console.log('xx', error.message);
  }
};

//remove error
export const removeError = () => async dispatch => {
  dispatch({
    type : actionAuth.REMOVE_ERROR
  })
}


