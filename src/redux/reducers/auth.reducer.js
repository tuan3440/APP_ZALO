import {actionAuth} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  id: '',
  phone: '',
  username: '',
  avatar: '',
  cover_image: '',
  blocked_inbox: [],
  token: "",
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAuth.SIGNUP_SUCCESS:
      return {
        ...state,
        id: action.payload.data._id,
        phone: action.payload.data.phonenumber,
        token: action.payload.token,
        username: action.payload.data.username,
        avatar: action.payload.data.avatar,
        cover_image: action.payload.data.cover_image,
        blocked_inbox: action.payload.data.blocked_inbox,
        error : ""
      };
    case actionAuth.SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload.message,
      };
    case actionAuth.LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.data.id,
        phone: action.payload.data.phonenumber,
        token: action.payload.token,
        username: action.payload.data.username,
        blocked_inbox: action.payload.data.blocked_inbox,
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
    case actionAuth.CHANGE_TOKEN:
      return {
        ...state,
        token : action.payload
      }
    case actionAuth.LOGOUT: 
      return {
        ...state,
        token : ""
      }
    case actionAuth.BLOCK_INBOX: 
       return {
         ...state,
         blocked_inbox : action.payload.data.blocked_inbox
       }
    default:
      return state;
  }
};

export default authReducer;
