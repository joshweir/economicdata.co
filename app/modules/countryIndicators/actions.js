import { createActions } from 'redux-actions';

// actions
export const FETCH_COUNTRY_INDICATOR_DATA = 'FETCH_COUNTRY_INDICATOR_DATA';
export const FETCH_COUNTRY_INDICATOR_DATA_SUCCESS = 'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS';
export const FETCH_COUNTRY_INDICATOR_DATA_FAILURE = 'FETCH_COUNTRY_INDICATOR_DATA_FAILURE';
export const FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS = 'FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS';
export const LOAD_MORE_INDICATOR_DATA = 'LOAD_MORE_INDICATOR_DATA';

export const {
  fetchCountryIndicatorData,
  fetchCountryIndicatorDataSuccess,
  fetchCountryIndicatorDataFailure,
  fetchMoreCountryIndicatorDataSuccess,
  loadMoreIndicatorData
} = createActions(
  FETCH_COUNTRY_INDICATOR_DATA,
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
  FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
  FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS,
  LOAD_MORE_INDICATOR_DATA
);
