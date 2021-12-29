import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import postReducer from './post.reducer'
import friendReducer from './friend.reducer';

const reducers = combineReducers({
    auth : authReducer,
    user : userReducer,
    post : postReducer,
    friend : friendReducer
})

export default (state, action) => reducers(state, action);
