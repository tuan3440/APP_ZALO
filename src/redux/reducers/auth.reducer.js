import {actionAuth} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  _id: '',
  phone: '',
  username: '',
  avatar: '',
  cover_image: '',
  token: AsyncStorage.getItem('token') ? AsyncStorage.getItem('token') : "",
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAuth.SIGNUP_SUCCESS:
      AsyncStorage.setItem('token', action.payload.token);
      return {
        ...state,
        _id: action.payload.data.id,
        phone: action.payload.data.phonenumber,
        token: action.payload.token,
        username: action.payload.data.username,
        avatar: action.payload.data.avatar,
        cover_image: action.payload.data.cover_image,
        error : ""
      };
    case actionAuth.SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload.message,
      };
    case actionAuth.LOGIN_SUCCESS:
      AsyncStorage.setItem('token', action.payload.token);
      return {
        ...state,
        _id: action.payload.data.id,
        phone: action.payload.data.phonenumber,
        token: action.payload.token,
        username: action.payload.data.username,
        error : ""
      };
    case actionAuth.LOGIN_FAILURE:
      return {
        ...state,
        error : action.payload.message
      }
    case actionAuth.REMOVE_ERROR:
      return {
        ...state,
       error : ""
      };
    default:
      return state;
  }
};

export default authReducer;
