import { createAction } from 'redux-actions';
import * as types from '../types';

export const fetchCountriesList = createAction(types.FETCH_COUNTRIES_LIST);
export const fetchCountriesListSuccess =
  createAction(types.FETCH_COUNTRIES_LIST_SUCCESS);
export const fetchCountriesListFailure =
  createAction(types.FETCH_COUNTRIES_LIST_FAILURE);

export const selectCountry = createAction(types.SELECT_COUNTRY);
export const fetchCountryIndicatorsSuccess =
  createAction(types.FETCH_COUNTRY_INDICATORS_SUCCESS);
export const fetchCountryIndicatorsFailure =
  createAction(types.FETCH_COUNTRY_INDICATORS_FAILURE);
