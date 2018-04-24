import { createActions } from 'redux-actions';

export const FETCH_COUNTRY_INDICATORS = 'FETCH_COUNTRY_INDICATORS';
export const FETCH_COUNTRY_INDICATORS_SUCCESS = 'FETCH_COUNTRY_INDICATORS_SUCCESS';
export const FETCH_COUNTRY_INDICATORS_FAILURE = 'FETCH_COUNTRY_INDICATORS_FAILURE';
export const FETCH_COUNTRY_INDICATOR_DATA_SUCCESS = 'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS';
export const TYPING = 'TYPING';
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const {
  fetchCountryIndicators,
  fetchCountryIndicatorsSuccess,
  fetchCountryIndicatorsFailure
} = createActions(
  FETCH_COUNTRY_INDICATORS,
  FETCH_COUNTRY_INDICATORS_SUCCESS,
  FETCH_COUNTRY_INDICATORS_FAILURE
);
