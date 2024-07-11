import {createStore,applyMiddleware,combineReducers} from 'redux';
import { thunk } from 'redux-thunk';
import CustomerReducer from './reducers/CustomerReducer';
import ItemReducers from './reducers/ItemReducers';
import TraderReducer from './reducers/TraderReducer';

const rootReducer=combineReducers({
    customers : CustomerReducer,
    states_name : CustomerReducer,
    items : ItemReducers,
    traders : TraderReducer,
    item : ItemReducers,
});
const store=createStore(rootReducer,applyMiddleware(thunk));    
export default store;