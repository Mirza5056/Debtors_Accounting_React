import {createStore,applyMiddleware,combineReducers} from 'redux';
import { thunk } from 'redux-thunk';
import CustomerReducer from './reducers/CustomerReducer';

const rootReducer=combineReducers({
    customers : CustomerReducer,
    states_name : CustomerReducer,
});
const store=createStore(rootReducer,applyMiddleware(thunk));    
export default store;