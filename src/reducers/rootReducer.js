import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // !!!! Need to implent routing in Redux

// Import reducers
import availableBeers from './beerListReducer';
import user from './userReducer';

const rootReducer = combineReducers({ availableBeers, user });

export default rootReducer;
