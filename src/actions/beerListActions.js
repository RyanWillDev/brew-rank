import axios from 'axios';
import store from '../store';

export function fetchAvailableBeers() {
  axios.get('http://127.0.0.1:3000/restapi/beers')
  .then((response) => {
    store.dispatch({ type: 'FETCH_AVAILABLE_BEERS_FULLFILLED', payload: response.data });
  })
  .catch((err) => {
    store.dispatch({ type: 'FETCH_AVAILABLE_BEERS_FAILED', payload: err });
  });
}
