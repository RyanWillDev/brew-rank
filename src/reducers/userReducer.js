export default function reducer(state = {
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_USER_DATA_FULLFILLED': {
      const data = action.payload;
      return {
        ...state,
        data,
      };
    }
    default:
      return state;
  }
}
