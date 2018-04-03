import { combineReducers } from 'redux';
import * as types from '../types';

const countriesIndicators = (
  state = [],
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const countries = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.FETCH_COUNTRIES_LIST_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const countrySelected = (
  state = null,
  action
) => {
  switch (action.type) {
    case types.SELECT_COUNTRY:
      return action.payload;
    case types.FETCH_COUNTRY_INDICATOR_SUCCESS:
      return action.data.countrySelected;
    default:
      return state;
  }
};

const countrySelectedIndicators = (
  state = [],
  action
) => {
  switch (action.type) {
    // case types.SELECT_COUNTRY:
    //  return action.data.countryIndicators;
    case types.FETCH_COUNTRY_INDICATORS_SUCCESS:
      return action.payload.countryIndicators;
    case types.FETCH_COUNTRY_INDICATOR_SUCCESS:
      return action.data.countrySelectedIndicators;
    default:
      return state;
  }
};

const countryIndicatorSelected = (
  state = null,
  action
) => {
  switch (action.type) {
    case types.SELECT_COUNTRY:
      return null;
    case types.FETCH_COUNTRY_INDICATOR_SUCCESS:
      return action.data.countryIndicatorSelected;
    default:
      return state;
  }
};

const masterData = combineReducers({
  countriesIndicators,
  countries,
  countrySelected,
  countrySelectedIndicators,
  countryIndicatorSelected
});

export default masterData;
