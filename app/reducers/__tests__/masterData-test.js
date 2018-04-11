import expect from 'expect';
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

  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('handles FETCH_COUNTRIES_LIST_SUCCESS', () => {
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

  it('handles SELECT_COUNTRY', () => {
    expect(
      reducer(initialStateWithIndicatorSelected, {
        type: types.SELECT_COUNTRY,
        payload: countrySelected
      })
    ).toEqual({
      ...initialState, countrySelected
    });
  });

  it('handles FETCH_COUNTRY_INDICATOR_DATA_SUCCESS', () => {
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

  it('handles FETCH_COUNTRY_INDICATORS_SUCCESS', () => {
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
