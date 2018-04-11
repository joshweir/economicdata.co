import * as types from '../types';

export default (state = false, action) => {
  switch (action.type) {
    case types.FETCH_COUNTRY_INDICATOR_DATA:
    case types.FETCH_COUNTRIES_LIST:
      return true;
    case types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS:
    case types.FETCH_COUNTRY_INDICATOR_DATA_FAILURE:
    case types.FETCH_COUNTRIES_LIST_SUCCESS:
    case types.FETCH_COUNTRIES_LIST_FAILURE:
      return false;
    default:
      return state;
  }
};
