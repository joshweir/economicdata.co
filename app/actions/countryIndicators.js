import { push } from 'react-router-redux'
import { createAction } from 'redux-actions';
import * as types from '../types';
import { countryIndicatorService } from '../services';

export function setCountryIndicatorSelected(countryIndicator) {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_COUNTRY_INDICATOR_DATA });
    return countryIndicatorService().getCountryIndicator({
      country: getState().masterData.countrySelected,
      indicator: countryIndicator
    })
    .then(({data}) => {
      const { countrySelected, countryIndicatorSelected } = data;
      dispatch(push(`/data/${countrySelected}/${countryIndicatorSelected}`));
      dispatch({ type: types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS, data });
      return data;
    })
    .catch((error) => {
      return dispatch({ type: types.FETCH_COUNTRY_INDICATOR_DATA_FAILURE, error });
    });
  };
}
// this will replace the above function:
export const fetchCountryIndicatorData =
  createAction(types.FETCH_COUNTRY_INDICATOR_DATA);
export const fetchCountryIndicatorDataSuccess =
  createAction(types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS);
export const fetchCountryIndicatorDataFailure =
  createAction(types.FETCH_COUNTRY_INDICATOR_DATA_FAILURE);
