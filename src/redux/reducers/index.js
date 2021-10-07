import {combineReducers} from 'redux';
import postReducer from './post.reducer';

const reducers = combineReducers({
    post : postReducer
})

export default (state, action) => reducers(state, action);
