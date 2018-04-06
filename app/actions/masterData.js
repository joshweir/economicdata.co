import { createAction } from 'redux-actions';
import * as types from '../types';
import { masterDataService } from '../services';

/*
const extractCountriesListFailure = (data) => {
  return {
    type: types.FETCH_COUNTRIES_LIST_FAILURE,
    error: data.error
  };
};

export function extractCountriesList(countriesIndicators) {
  return (dispatch) => {
    dispatch({ type: types.FETCH_COUNTRIES_LIST });
    return masterDataService()
      .extractCountriesList({ from: countriesIndicators })
      .then(data => dispatch({
        type: types.FETCH_COUNTRIES_LIST_SUCCESS, data
      }))
      .catch(() => dispatch(extractCountriesListFailure({
        error: 'Oops! Something went wrong and we couldn\'t ' +
          'initialize the list of countries'
      })));
  };
}
*/
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
