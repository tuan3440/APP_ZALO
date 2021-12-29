import {actionAuth} from '../constants/constants';
// import axios from 'axios';
import api from '../../api/index';

//get infomation user
export const showUser = (token) => async dispatch => {
    try {
       await api.get("users/show", { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
            dispatch({
                type: actionAuth.SHOW_USER,
                payload: res.data,
              })
        }
       
      ).catch(err => 
        {
            dispatch({
                type: actionAuth.GET_ERROR,
                payload: err.response.data,
              })
        }
        
      )
    } catch (error) {
      console.log('xx', error.message);
    }
  };

