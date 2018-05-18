import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({
  FETCH_COUNTRY_DATA_SUCCESS: (state, { payload }) => payload
}, initialState);
