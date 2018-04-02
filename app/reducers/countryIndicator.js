import { combineReducers } from 'redux';
import * as types from '../types';

const indicatorInfo = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.FETCH_COUNTRY_INDICATOR_SUCCESS:
      return action.data.indicatorInfo;
    default:
      return state;
  }
};

const indicatorData = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.FETCH_COUNTRY_INDICATOR_SUCCESS:
      return action.data.indicatorData;
    default:
      return state;
  }
};

const countryIndicatorReducer = combineReducers({
  indicatorInfo,
  indicatorData
});

export default countryIndicatorReducer;
