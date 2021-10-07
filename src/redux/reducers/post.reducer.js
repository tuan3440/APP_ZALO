import {actionPost} from '../constants/constants';

const initialState = {
    posts : []
}

const postReducer = (state = initialState, action) => {
     switch (action.type) {
         case actionPost.GET_POSTS:
            return state;
         default:
             return state;
     }
}

export default postReducer;

