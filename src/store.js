import { createStore, compose } from 'redux';
import beerList from './reducers/beerListReducer';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);


const store = createStore(beerList, enhancers);

export default store;
