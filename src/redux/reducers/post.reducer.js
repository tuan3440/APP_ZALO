import {actionPost} from '../constants/constants';

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionPost.GET_POSTS:
      return {
        ...state,
        posts: action.payload.data,
      };
    case actionPost.DELETE_POST:
      const a = state.posts.filter(element => {
        return element._id !== action.payload;
      });
      return {
        ...state,
        posts : a
      };
    default:
      return state;
  }
};

export default postReducer;
