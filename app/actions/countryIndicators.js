import { createAction } from 'redux-actions';
import * as types from '../types';

export const fetchCountryIndicatorData =
  createAction(types.FETCH_COUNTRY_INDICATOR_DATA);
export const fetchCountryIndicatorDataSuccess =
  createAction(types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS);
export const fetchCountryIndicatorDataFailure =
  createAction(types.FETCH_COUNTRY_INDICATOR_DATA_FAILURE);
