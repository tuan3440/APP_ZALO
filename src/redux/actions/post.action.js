import {actionPost} from '../constants/constants';
import api from '../../api/index';

//lấy danh sách bài viết

export const getListPost = token => async dispatch => {
  try {
    await api
      .get('posts/list', {headers: {authorization: `Bearer ${token}`}})
      .then(res => {
        dispatch({
          type: actionPost.GET_POSTS,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log('b', err.response.data);
        //  dispatch({
        //      type: actionAuth.GET_ERROR,
        //      payload: err.response.data,
        //    })
      });
  } catch (error) {
    console.log('xx', error.message);
  }
};
//create post
export const createPost =
  (token, data) => async dispatch => {
    console.log("xex", data);
    try {
      await api
        .post('posts/create', data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log('a', res.data);
          //  dispatch({
          //      type: actionAuth.SHOW_USER,
          //      payload: res.data,
          //    })
        })
        .catch(err => {
          console.log('b', err);
          //  dispatch({
          //      type: actionAuth.GET_ERROR,
          //      payload: err.response.data,
          //    })
        });
    } catch (error) {
      console.log('xx', error.message);
    }
  };
//delete post
export const deletePost = (token, id) => async dispatch => {
  try {
    await api
      .get('posts/delete/' + id, {headers: {authorization: `Bearer ${token}`}})
      .then(res => {
        dispatch({
          type: actionPost.DELETE_POST,
          payload: id,
        });
      })
      .catch(err => {
        console.log('b', err);
        //  dispatch({
        //      type: actionAuth.GET_ERROR,
        //      payload: err.response.data,
        //    })
      });
  } catch (error) {
    console.log('xx', error.message);
  }
};

//hide post 

export const hiddenPost = (id) => async dispatch => {
  try {
    dispatch({
      type: actionPost.DELETE_POST,
      payload: id,
    });
  } catch (error) {
    console.log('xx', error.message);
  }
};

//like post
export const likePost = (token, postId) => async dispatch => {
  console.log('x');
  try {
    await api
      .get('postLike/action/' + postId, {
        headers: {authorization: `Bearer ${token}`},
      })
      .then(res => {
        dispatch({
          type: actionPost.LIKE_POST,
          payload: {
            id: postId,
            post: res.data,
          },
        });
      })
      .catch(err => {
        console.log('b', err);
        //  dispatch({
        //      type: actionAuth.GET_ERROR,
        //      payload: err.response.data,
        //    })
      });
  } catch (error) {
    console.log('xxx', error);
  }
};
//create comment
// Login
export const postComment = (token, comment, postId) => async dispatch => {
  try {
    await api
      .post(
        'postComment/create/' + postId,
        {
          content: comment,
        },
        {headers: {authorization: `Bearer ${token}`}},
      )
      .then(res => {
        console.log('comment', res.data);
      })
      .catch(err => {
        console.log('b', err);
      });
  } catch (error) {
    console.log('xx', error.message);
  }
};
//update count comment
export const updateCountComment = (id, number) => async dispatch => {
  dispatch({
    type: actionPost.UPDATE_COMMENT,
    payload: {
      id: id,
      number: number,
    },
  });
};
