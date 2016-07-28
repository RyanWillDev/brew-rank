export default function reducer(state = {
  availableBeers: [],
  userData: {},
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_AVAILABLE_BEERS_FULLFILLED':
      console.log('Running');
      return {
        ...state,
        availableBeers: state.availableBeers.concat(action.payload),
      };
    default:
      return state;
  }
}
