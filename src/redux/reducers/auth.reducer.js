import {actionAuth} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  id: '',
  phone: '',
  username: '',
  avatar: '',
  cover_image: '',
  token: "",
  error: '',
};


const removeTokenStorage = async () => {
    try {
       const n = await AsyncStorage.removeItem("token");
       return n;
    } catch(e) {
       
    }
}

const getTokenStorage = async () => {
  try {
    const a = await AsyncStorage.getIem("token");
    console.log("token", a);
    return a;
  } catch(e) {
     
  }
}

const saveTokenStorage = async (token) => {
  try {
     const m = await AsyncStorage.setItem("token", token);
     return m;
  } catch(e) {
     
  }
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAuth.SIGNUP_SUCCESS:
      saveTokenStorage(action.payload.token)
      return {
        ...state,
        id: action.payload.data.id,
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
      saveTokenStorage(action.payload.token)
      return {
        ...state,
        id: action.payload.data.id,
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
    case actionAuth.CHANGE_TOKEN:
      return {
        ...state,
        token : action.payload
      }
    case actionAuth.LOGOUT: 
      removeTokenStorage();
      return {
        ...state,
        token : ""
      }
    default:
      return state;
  }
};

export default authReducer;
