/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import reducer from '../reducers';
import {
  FETCH_COUNTRY_INDICATORS,
  FETCH_COUNTRY_INDICATORS_SUCCESS, FETCH_COUNTRY_INDICATORS_FAILURE,
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
  fetchCountryIndicators, fetchCountryIndicatorsSuccess,
  fetchCountryIndicatorsFailure } from '../actions';
import { FETCH_COUNTRY_DATA_SUCCESS } from '../../country/actions';
import rootSaga from '../sagas';
import api from '../api';
import { getCountriesIndicators, getCountrySelected,
  getCountriesForSelect, getCountryIndicatorsForSelect } from '../selectors';

jest.mock('../api');
polyfill();

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  masterData: {
    countriesIndicators: [],
    countrySelected: null,
    countrySelectedIndicators: [],
    countryIndicatorSelected: null
  }
};
const reducerInitialState = initialState.masterData;

describe('masterData Actions', () => {
  describe('#fetchCountryIndicators', () => {
    const country = 'united-states';
    const payload = country;
    const expectedCountryIndicators = [
      {value: 'gdp', label: 'GDP'},
      {value: 'cpi', label: 'CPI'}
    ];
    const countriesIndicators = [
      {
        country: 'united-states',
        countryLabel: 'United States',
        indicators: expectedCountryIndicators
      },
      {
        country: 'australia',
        countryLabel: 'Australia',
        indicators: []
      }
    ];
    const initialStateWithCountriesIndicators = {
      masterData: {
        countriesIndicators,
        countrySelected: country,
        countrySelectedIndicators: [],
        countryIndicatorSelected: null
      }
    };

    test('dispatches FETCH_COUNTRY_INDICATORS action', (done) => {
      const store = mockStore(initialStateWithCountriesIndicators);
      sagaMiddleware.run(rootSaga);
      const expectedActions = [
        {
          type: FETCH_COUNTRY_INDICATORS,
          payload: country
        },
        {
          type: FETCH_COUNTRY_INDICATORS_SUCCESS,
          payload: expectedCountryIndicators
        }
      ];

      store.subscribe(() => {
        const actualActions = store.getActions();
        if (actualActions.length >= expectedActions.length) {
          expect(actualActions).toEqual(expectedActions);
          done();
        }
      });
      store.dispatch(fetchCountryIndicators(payload));
    });
  });
});

describe('masterData reducer', () => {
  const initialStateWithIndicatorSelected = {
    ...reducerInitialState,
    countryIndicatorSelected: 'cpi'
  };
  const countrySelected = 'usa';
  const countrySelectedIndicators = ['gdp', 'cpi'];
  const countryIndicatorSelected = 'gdp';

  test('returns the initial state', () => {
    expect(
      reducer(undefined, {type: 'FOO'})
    ).toEqual(reducerInitialState);
  });

  test('handles FETCH_COUNTRY_INDICATORS', () => {
    expect(
      reducer(initialStateWithIndicatorSelected, {
        type: FETCH_COUNTRY_INDICATORS,
        payload: countrySelected
      })
    ).toEqual({
      ...reducerInitialState, countrySelected
    });
  });

  test('handles FETCH_COUNTRY_INDICATOR_DATA_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
        payload: {
          countrySelected,
          countrySelectedIndicators,
          countryIndicatorSelected
        }
      })
    ).toEqual({
      ...reducerInitialState,
      countrySelected,
      countrySelectedIndicators,
      countryIndicatorSelected
    });
  });

  test('handles FETCH_COUNTRY_INDICATORS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: FETCH_COUNTRY_INDICATORS_SUCCESS,
        payload: countrySelectedIndicators
      })
    ).toEqual({
      ...reducerInitialState, countrySelectedIndicators
    });
  });

  test('handles FETCH_COUNTRY_DATA_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: FETCH_COUNTRY_DATA_SUCCESS,
        payload: {
          indicators: countrySelectedIndicators,
          country: countrySelected
        }
      })
    ).toEqual({
      ...reducerInitialState, countrySelectedIndicators, countrySelected
    });
  });
});

describe('masterData selectors', () => {
  const state = {
    masterData: {
      countriesIndicators: [
        {
          country: 'united-states',
          countryLabel: 'United States',
          indicators: [
            'ind1', 'ind2'
          ]
        },
        {
          country: 'australia',
          countryLabel: 'Australia',
          indicators: [
            'ind3', 'ind4'
          ]
        }
      ],
      countries: ['aus', 'usa'],
      countrySelected: null
    }
  };
  const stateWithCountrySelected = {
    ...state,
    masterData: {
      ...state.masterData,
      countrySelected: 'australia'
    }
  };

  describe('getCountriesIndicators', () => {
    test('it retrieves the countriesIndicators', () => {
      expect(getCountriesIndicators(state))
      .toEqual(state.masterData.countriesIndicators);
    });
  });

  describe('getCountriesForSelect', () => {
    test('it retrieves the countries in react select compatible format', () => {
      expect(getCountriesForSelect(state))
      .toEqual([
        {
          label: 'United States',
          value: 'united-states'
        },
        {
          label: 'Australia',
          value: 'australia'
        }
      ]);
    });
  });

  describe('getCountrySelected', () => {
    test('it retrieves the selected country', () => {
      expect(getCountrySelected(stateWithCountrySelected))
      .toEqual(stateWithCountrySelected.masterData.countrySelected);
    });
  });

  describe('getCountryIndicatorsForSelect', () => {
    test('it retrieves the country indicators based on countrySelected ' +
         'in react select compatible format', () => {
      expect(getCountryIndicatorsForSelect(stateWithCountrySelected))
      .toEqual(['ind3', 'ind4']);
    });
  });
});
