import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const initialState = {
  countrySelected: null,
  countrySelectedIndicators: [],
  countryIndicatorSelected: null,
  countriesIndicators: []
};

const countriesIndicators = (state = []) => state;

const countrySelected = handleActions({
  FETCH_COUNTRY_INDICATORS: (state, action) => action.payload,
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS: (state, action) => action.payload.countrySelected
}, initialState.countrySelected);

const countrySelectedIndicators = handleActions({
  FETCH_COUNTRY_INDICATORS_SUCCESS: (state, action) => action.payload,
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS: (state, action) => action.payload.countrySelectedIndicators
}, initialState.countrySelectedIndicators);

const countryIndicatorSelected = handleActions({
  FETCH_COUNTRY_INDICATORS: () => null,
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS: (state, action) => action.payload.countryIndicatorSelected
}, initialState.countryIndicatorSelected);

export default combineReducers({
  countriesIndicators,
  countrySelected,
  countrySelectedIndicators,
  countryIndicatorSelected
});
