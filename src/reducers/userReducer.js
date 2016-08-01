export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_USER_DATA_FULLFILLED': {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
