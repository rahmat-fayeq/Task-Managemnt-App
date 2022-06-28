import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers';

const rootReducer = combineReducers({taskReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
