export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_USER_DATA_FULLFILLED': {
      return {
        ...action.payload,
      };
    }
    case 'ADD_BEER_TO_USERS_LIST':
      return {
        ...state,
        beers: [
          ...state.beers,
          {
            _id: {
              ...action.payload,
            },
            rating: 0,
          },
        ],
      };
    case 'REMOVE_BEER_FROM_LIST':
      return {
        ...state,
        beers: [
          ...state.beers.slice(0, action.payload),
          ...state.beers.slice(action.payload + 1),
        ],
      };
    default:
      return state;
  }
}
