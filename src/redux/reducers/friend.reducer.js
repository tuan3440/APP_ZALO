import {actionFriend} from '../constants/constants';

const initialState = {
  listFriend: [],
  listRequest: [],
  listRequested: [],
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionFriend.GET_LIST_FRIEND:
      return {
        ...state,
        listFriend: action.payload.friends,
      };
    case actionFriend.GET_LIST_REQUEST:
      return {
        ...state,
        listRequest: action.payload.friends,
      };
    case actionFriend.GET_LIST_REQUESTED:
      return {
        ...state,
        listRequested: action.payload.friends,
      };
    case actionFriend.REMOVE_FRIEND:
      const newListFriend = state.listFriend.filter(friend => {
        return friend._id != action.payload.user_id;
      });
      return {
        ...state,
        listFriend: newListFriend,
      };
    case actionFriend.ACCEPT_REQUEST:
        let newFriend = null;
        let newListRequest = state.listRequest.filter(friend => {
        if (friend._id == action.payload.user_id) {
            newFriend = friend;
            return false;
        }
        else return true;
       });
      return {
          ...state,
          listRequest : newListRequest,
          listFriend : [
              ...state.listFriend,
              newFriend
          ]
      }
    case actionFriend.REMOVE_REQUEST:
        let newListRequest1 = state.listRequest.filter(friend => {
            return friend._id != action.payload.user_id;
          });
          return {
            ...state,
            listRequest: newListRequest1
          };
    case actionFriend.SEND_REQUEST:
        return {
            ...state,
            listRequested : [
                ...state.listRequested,
                {_id : action.payload.user_id}
            ]
        }
    default:
      return state;
  }
};

export default friendReducer;
