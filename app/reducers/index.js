import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../reducers/user';
import message from '../reducers/message';
import masterData from '../reducers/masterData';
import countryIndicator from '../reducers/countryIndicator';
import * as types from '../types';

const isFetching = (state = false, action) => {
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

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  user,
  message,
  routing,
  masterData,
  countryIndicator
});

export default rootReducer;
