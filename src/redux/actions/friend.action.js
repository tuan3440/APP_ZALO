import {actionFriend} from '../constants/constants';
// import axios from 'axios';
import api from '../../api/index';

//get list friend
export const getListFriend = (token) => async dispatch => {
    try {
       await api.get("friends/list/", { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
            dispatch({
                type: actionFriend.GET_LIST_FRIEND,
                payload: res.data.data,
              })
        }
       
      )
    } catch (error) {
      console.log('xx', error.message);
    }
  };

//get list request
export const getListRequest = (token) => async dispatch => {
    try {
       await api.get("friends/get-requested-friend/", { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
            dispatch({
                type: actionFriend.GET_LIST_REQUEST,
                payload: res.data.data,
              })
        }
       
      )
    } catch (error) {
      console.log('xx', error.message);
    }
};


//get list requested
export const getListRequested = (token) => async dispatch => {
    try {
       await api.get("friends/get-requested-friend-user-send/", { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
            dispatch({
                type: actionFriend.GET_LIST_REQUESTED,
                payload: res.data.data,
              })
        }
       
      )
    } catch (error) {
      console.log('xx', error.message);
    }
};

//remove friend
export const removeFriend = (token, user_id) => async dispatch => {
    try {
       await api.post("friends/set-remove/",
       {
        user_id : user_id
      },
       { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
        dispatch({
            type: actionFriend.REMOVE_FRIEND,
            payload: {
                user_id : user_id
            }
            })
        }
      )
    } catch (error) {
      console.log('xx', error.message);
    }
};

//accept request
export const acceptRequestFriend = (token, user_id) => async dispatch => {
    try {
       await api.post("friends/set-accept/",
       {
        user_id : user_id,
        is_accept: 1
      },
       { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
        dispatch({
            type: actionFriend.ACCEPT_REQUEST,
            payload: {
                user_id : user_id
            }
            })
        }
      )
    } catch (error) {
      console.log('xx', error.message);
    }
};

//remove request
export const removeRequestFriend = (token, user_id) => async dispatch => {
    try {
       await api.post("friends/set-remove/",
       {
        user_id : user_id,
        is_accept: 2
      },
       { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
        dispatch({
            type: actionFriend.REMOVE_REQUEST,
            payload: {
                user_id : user_id
            }
            })
        }
      )
    } catch (error) {
      console.log('xx', error.message);
    }
};

//send request
export const sendRequestFriend = (token, user_id) => async dispatch => {
    try {
       await api.post("friends/set-request-friend/",
       {
        user_id : user_id,
      },
       { headers: {"authorization" : `Bearer ${token}`}}).then(res =>
        {
        dispatch({
            type: actionFriend.SEND_REQUEST,
            payload: {
                user_id : user_id
            }
            })
        }
      )
    } catch (error) {
      console.log('xx', error.message);
    }
};