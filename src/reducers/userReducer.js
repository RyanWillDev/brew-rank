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
    default:
      return state;
  }
}
