import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entity from '../reducers/entity';
import user from '../reducers/user';
import topic from '../reducers/topic';
import message from '../reducers/message';
import masterData from '../reducers/masterData';
import countryIndicator from '../reducers/countryIndicator';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_COUNTRY_INDICATOR:
    case types.FETCH_COUNTRIES_LIST:
      return true;
    case types.FETCH_COUNTRY_INDICATOR_SUCCESS:
    case types.FETCH_COUNTRY_INDICATOR_FAILURE:
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
  topic,
  entity,
  user,
  message,
  routing,
  masterData,
  countryIndicator
});

export default rootReducer;
