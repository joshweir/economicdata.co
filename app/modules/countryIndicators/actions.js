import { createActions } from 'redux-actions';

// actions
export const FETCH_COUNTRY_INDICATOR_DATA = 'FETCH_COUNTRY_INDICATOR_DATA';
export const FETCH_COUNTRY_INDICATOR_DATA_SUCCESS = 'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS';
export const FETCH_COUNTRY_INDICATOR_DATA_FAILURE = 'FETCH_COUNTRY_INDICATOR_DATA_FAILURE';

export const {
  fetchCountryIndicatorData,
  fetchCountryIndicatorDataSuccess,
  fetchCountryIndicatorDataFailure
} = createActions(
  FETCH_COUNTRY_INDICATOR_DATA,
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
  FETCH_COUNTRY_INDICATOR_DATA_FAILURE
);
