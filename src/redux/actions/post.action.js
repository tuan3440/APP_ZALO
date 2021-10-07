import {actionPost} from '../constants/constants';
import api from '../../api/index';

//lấy danh sách bài viết
export const getListPost = (token, index, userId) => async dispatch => {
  try {
    const res = await api.get('posts/list');
    //console.log(`res.data`, res.data);
    //nếu lấy về thành công

    dispatch({
      type: actionPost.GET_POSTS,
      data: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
