import reducer from '../../reducers/masterData';
import * as types from '../../types';

describe('masterData reducer', () => {
  const initialState = {
    countries: [],
    countriesIndicators: [],
    countryIndicatorSelected: null,
    countrySelected: null,
    countrySelectedIndicators: []
  };
  const initialStateWithIndicatorSelected = {
    ...initialState,
    countryIndicatorSelected: 'cpi'
  };
  const countrySelected = 'usa';
  const countrySelectedIndicators = ['gdp', 'cpi'];
  const countryIndicatorSelected = 'gdp';

  test('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  test('handles FETCH_COUNTRIES_LIST_SUCCESS', () => {
    const countries = ['usa', 'aus'];
    expect(
      reducer(undefined, {
        type: types.FETCH_COUNTRIES_LIST_SUCCESS,
        payload: countries
      })
    ).toEqual({
      ...initialState, countries
    });
  });

  test('handles SELECT_COUNTRY', () => {
    expect(
      reducer(initialStateWithIndicatorSelected, {
        type: types.SELECT_COUNTRY,
        payload: countrySelected
      })
    ).toEqual({
      ...initialState, countrySelected
    });
  });

  test('handles FETCH_COUNTRY_INDICATOR_DATA_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
        payload: {
          countrySelected,
          countrySelectedIndicators,
          countryIndicatorSelected
        }
      })
    ).toEqual({
      ...initialState,
      countrySelected,
      countrySelectedIndicators,
      countryIndicatorSelected
    });
  });

  test('handles FETCH_COUNTRY_INDICATORS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_COUNTRY_INDICATORS_SUCCESS,
        payload: countrySelectedIndicators
      })
    ).toEqual({
      ...initialState, countrySelectedIndicators
    });
  });
});
