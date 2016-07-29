export default function reducer(state = {
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_AVAILABLE_BEERS_FULLFILLED':
      return {
        ...state,
        list: action.payload,
      };
    case 'FETCH_AVAILABLE_BEERS_FAILED':
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
}
