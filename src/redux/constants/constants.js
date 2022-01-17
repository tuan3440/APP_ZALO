export const BASE_URL = 'localhost:8000/';

export const actionPost = {
    GET_POSTS : 'GET_POSTS',
    EDIT_POST : 'EDIT_POST',
    CREATE_POST : 'CREATE_POST',
    DELETE_POST : 'DELETE_POST',
    ACTION_POST : 'ACTION_POST',
    GET_COMMENT : 'GET_COMMENT',
    UPDATE_COMMENT : 'UPDATE_COMMENT',
    LIKE_POST : 'LIKE_POST',
    HIDDEN_POST: "HIDDEN_POST"
}

export const actionAuth = {
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAILURE: 'SIGNUP_FAILURE',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    REMOVE_ERROR: 'REMOVE_ERROR',
    SHOW_USER : 'SHOW_USER',
    GET_ERROR : 'GET_ERROR',
    CHANGE_TOKEN : "CHANGE_TOKEN",
    LOGOUT : 'LOGOUT',
    BLOCK_INBOX : 'BLOCK_INBOX'
}

export const actionFriend = {
    GET_LIST_FRIEND : 'GET_LIST_FRIEND',
    GET_LIST_REQUEST : 'GET_LIST_REQUEST',
    GET_LIST_REQUESTED : 'GET_LIST_REQUESTED',
    REMOVE_FRIEND : 'REMOVE_FRIEND',
    ACCEPT_REQUEST : 'ACCEPT_REQUEST',
    REMOVE_REQUEST : 'REMOVE_REQUEST',
    SEND_REQUEST : 'SEND_REQUEST'
}

export const URL_FILE = "http://192.168.0.103:8000/files/";

export function convertTime(secs) {
    if (secs > 604800) {
        return "few weeks ago";
    } else {
        let day = Math.floor(secs/ 86400);
        if (day >= 1) {
            return day + ' day ago';
        } else {
            let hours = Math.floor(secs / (3600));
            if (hours >= 1) {
                return hours + " hours ago";
            } else {
                let minute = Math.floor(secs / (60));
                if (minute >=1) {
                    return minute + " minutes ago";
                } else {
                    return " few seconds ago";
                }
            }
        }
    }

}