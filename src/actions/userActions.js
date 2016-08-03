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

export function addBeerToUsersList(beerData) {
  store.dispatch({ type: 'ADD_BEER_TO_USERS_LIST', payload: beerData });
}

export function removeBeerFromList(index) {
  store.dispatch({ type: 'REMOVE_BEER_FROM_LIST', payload: index });
}

export function updateRating(id, newRating) {
  store.dispatch({ type: 'UPDATE_BEER_RATING', payload: { id, newRating } });
}

export function saveUserBeerList(userID) {
  const { beers } = store.getState().user;
  const beerData = beers.reduce((prev, curr, i) => {
    prev[i] = { rating: curr.rating, _id: curr._id._id };
    return prev;
  }, []);
  
}
