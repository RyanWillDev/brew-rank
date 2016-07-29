import axios from 'axios';
import store from '../store';

export function fetchUserData(userID) {
  axios.get(`http://127.0.0.1:3000/restapi/profile/${userID}`, { headers: { 'x-access-token': window.sessionStorage.brtoken } })
  .then((response) => {
    store.dispatch({ type: 'FETCH_USER_DATA_FULLFILLED', payload: response.data });
  })
  .catch((err) => {
    store.dispatch({ type: 'FETCH_USER_DATA_FAILED', payload: err });
  });
}
