import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

// actions
export const FETCH_COUNTRIES_LIST = 'FETCH_COUNTRIES_LIST';
export const FETCH_COUNTRIES_LIST_SUCCESS = 'FETCH_COUNTRIES_LIST_SUCCESS';
export const FETCH_COUNTRIES_LIST_FAILURE = 'FETCH_COUNTRIES_LIST_FAILURE';
export const FETCH_COUNTRY_INDICATORS = 'FETCH_COUNTRY_INDICATORS';
export const FETCH_COUNTRY_INDICATORS_SUCCESS = 'FETCH_COUNTRY_INDICATORS_SUCCESS';
export const FETCH_COUNTRY_INDICATORS_FAILURE = 'FETCH_COUNTRY_INDICATORS_FAILURE';
export const FETCH_COUNTRY_INDICATOR_DATA_SUCCESS = 'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS';

// Action Creators
export const fetchCountriesList = createAction(FETCH_COUNTRIES_LIST);
export const fetchCountriesListSuccess = createAction(FETCH_COUNTRIES_LIST_SUCCESS);
export const fetchCountriesListFailure = createAction(FETCH_COUNTRIES_LIST_FAILURE);
export const fetchCountryIndicators = createAction(FETCH_COUNTRY_INDICATORS);
export const fetchCountryIndicatorsSuccess = createAction(FETCH_COUNTRY_INDICATORS_SUCCESS);
export const fetchCountryIndicatorsFailure = createAction(FETCH_COUNTRY_INDICATORS_FAILURE);

// State
const initialState = {
  countries: [],
  countrySelected: null,
  countrySelectedIndicators: [],
  countryIndicatorSelected: null,
  countriesIndicators: []
};

// Reducers
const countriesIndicators = (state = []) => state;

const countries = handleActions({
  FETCH_COUNTRIES_LIST_SUCCESS: (state, action) => action.payload
}, initialState.countries);

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
  countries,
  countrySelected,
  countrySelectedIndicators,
  countryIndicatorSelected
});

// Selectors
export const getCountriesIndicators = state => state.masterData.countriesIndicators;
export const getCountries = state => state.masterData.countries;
