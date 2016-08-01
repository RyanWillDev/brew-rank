export default function reducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_AVAILABLE_BEERS_FULLFILLED':
      return [
        ...action.payload,
      ];
    case 'FETCH_AVAILABLE_BEERS_FAILED':
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
}
