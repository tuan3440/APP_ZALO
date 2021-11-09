import {actionPost} from '../constants/constants';
import api from '../../api/index';

//lấy danh sách bài viết

export const getListPost = (token) => async dispatch => {
  try {
    await api.get("posts/list",
     { headers: 
      {"authorization" : `Bearer ${token}`
      }})
      .then(res =>
     {
         dispatch({
             type: actionPost.GET_POSTS,
             payload: res.data,
           })
     }
    
   ).catch(err => 
     {
         console.log("b", err.response.data);
        //  dispatch({
        //      type: actionAuth.GET_ERROR,
        //      payload: err.response.data,
        //    })
     }
     
   )
 } catch (error) {
   console.log('xx', error.message);
 }
}
//create post
export const createPost = (token, images, videos, description) => async dispatch => {
  try {
    const data = new FormData();
    if (images != null) {
      data.append('images', {
        name: images.fileName,
        type: images.type,
        uri: Platform.OS === 'ios' ? images.uri.replace('file://', '') : images.uri,
        size : images.fileSize    
      });
    }
    data.append('described', description);
    
    await api.post("posts/create",
     data,
     { headers: 
      {"authorization" : `Bearer ${token}`,
       'Content-Type': 'multipart/form-data'
      }})
      .then(res =>
     {
         console.log("a", res.data);
        //  dispatch({
        //      type: actionAuth.SHOW_USER,
        //      payload: res.data,
        //    })
     }
    
   ).catch(err => 
     {
         console.log("b", err);
        //  dispatch({
        //      type: actionAuth.GET_ERROR,
        //      payload: err.response.data,
        //    })
     }
     
   )
 } catch (error) {
   console.log('xx', error.message);
 }
}
//delete post
export const deletePost = (token, id) => async dispatch => {
  console.log("delete", id);
  console.log("token", token);
  try {
    await api.get("posts/delete/" + id,
     { headers: 
      {"authorization" : `Bearer ${token}`,
      }})
      .then(res =>
     {
         console.log("a", res.data);
         dispatch({
             type: actionPost.DELETE_POST,
             payload: id,
           })
     }
    
   ).catch(err => 
     {
         console.log("b", err);
        //  dispatch({
        //      type: actionAuth.GET_ERROR,
        //      payload: err.response.data,
        //    })
     }
     
   )
 } catch (error) {
   console.log('xx', error.message);
 }
}
//like post
export const likePost = (token, postId) => async dispatch => {
  try {
    await api.post("postLike/action/" + postId,
     { headers: 
      {"authorization" : `Bearer ${token}`,
      }})
      .then(res =>
     {
         console.log("like", res.data);
        //  dispatch({
        //      type: actionAuth.SHOW_USER,
        //      payload: res.data,
        //    })
     }
    
   ).catch(err => 
     {
         console.log("b", err);
        //  dispatch({
        //      type: actionAuth.GET_ERROR,
        //      payload: err.response.data,
        //    })
     }
     
   )
 } catch (error) {
   console.log('xxx', error);
 }
}
//create comment
// Login
export const postComment = (token, comment, postId) => async dispatch => {
  try {
    await api.post("postComment/create/" + postId,
    {
      content : comment
    },
     { headers: 
      {"authorization" : `Bearer ${token}`,
      }})
      .then(res =>
     {
         console.log("comment", res.data);
     }
    
   ).catch(err => 
     {
         console.log("b", err);
     }
     
   )
  } catch (error) {
    console.log('xx', error.message);
  }
};


