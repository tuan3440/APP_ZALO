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
        posts: a,
      };
    case actionPost.UPDATE_COMMENT:
      const b = state.posts.map(element => {
        if (element._id == action.payload.id) {
          element.countComments = action.payload.number;
        }
        return element;
      });
      return {
        ...state,
        posts: b,
      };
    case actionPost.LIKE_POST:
      const c = state.posts.map(element => {
        if (element._id == action.payload.id) {
          element.isLike = action.payload.post.data.isLike;
          element.like = action.payload.post.data.like;
        }
        return element;
      });
      // const c = state.posts.map(element => {
      //   return element._id === action.payload.id ? action.payload.post.data : element;
      // });
      console.log("bb", c)
      return {
        ...state,
        posts : c
      };
    default:
      return state;
  }
};

export default postReducer;
