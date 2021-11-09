import {actionAuth} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    phonenumber : '',
    username : '',
    gender : '',
    birthday : '',
    avatar : {},
    cover_image : {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAuth.SHOW_USER:
      return {
        ...state,
       username : action.payload.data.username,
       avatar : action.payload.data.avatar.fileName
      };
    case actionAuth.GET_ERROR:
        console.log("yyy");
    default:
      return state;
  }
};

export default userReducer;
