/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import reducer, {
  FETCH_COUNTRIES_LIST, FETCH_COUNTRIES_LIST_SUCCESS,
  FETCH_COUNTRIES_LIST_FAILURE, FETCH_COUNTRY_INDICATORS,
  FETCH_COUNTRY_INDICATORS_SUCCESS, FETCH_COUNTRY_INDICATORS_FAILURE,
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
  fetchCountriesList, fetchCountriesListSuccess, fetchCountriesListFailure,
  fetchCountryIndicators, fetchCountryIndicatorsSuccess,
  fetchCountryIndicatorsFailure } from '../../modules/masterData';
import rootSaga from '../../sagas/masterData';
import createMasterDataService from '../../services/masterData';

jest.mock('../../services/masterData');
polyfill();

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  masterData: {
    countriesIndicators: [],
    countries: [],
    countrySelected: null,
    countrySelectedIndicators: [],
    countryIndicatorSelected: null
  }
};
const reducerInitialState = initialState.masterData;

describe('masterData Actions', () => {
  describe('#extractCountriesList', () => {
    const countriesIndicators = [
      {
        country: 'united-states',
        countryLabel: 'United States',
        indicators: []
      },
      {
        country: 'australia',
        countryLabel: 'Australia',
        indicators: []
      }
    ];
    const expectedCountriesList = [
      {
        label: 'United States',
        value: 'united-states'
      },
      {
        label: 'Australia',
        value: 'australia'
      }
    ];

    describe('on success', () => {
      test('dispatches FETCH_COUNTRIES_LIST and ' +
        'FETCH_COUNTRIES_LIST_SUCCESS actions', (done) => {
        const store = mockStore(initialState);
        sagaMiddleware.run(rootSaga);
        const expectedActions = [
          {
            type: FETCH_COUNTRIES_LIST,
            payload: countriesIndicators
          },
          {
            type: FETCH_COUNTRIES_LIST_SUCCESS,
            payload: expectedCountriesList
          }
        ];

        const extractCountriesListSpy = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedCountriesList));
        createMasterDataService.mockImplementation(() => {
          return {
            extractCountriesList: extractCountriesListSpy
          };
        });

        store.subscribe(() => {
          const actualActions = store.getActions();
          if (actualActions.length >= expectedActions.length) {
            expect(actualActions).toEqual(expectedActions);
            expect(extractCountriesListSpy)
            .toHaveBeenCalledWith({from: countriesIndicators});
            expect(extractCountriesListSpy).toHaveBeenCalledTimes(1);
            done();
          }
        });
        store.dispatch(fetchCountriesList(countriesIndicators));
      });
    });

    describe('on error', () => {
      test('dispatches FETCH_COUNTRIES_LIST_FAILURE action', (done) => {
        const store = mockStore(initialState);
        sagaMiddleware.run(rootSaga);
        const expectedActions = [
          {
            type: FETCH_COUNTRIES_LIST,
            payload: countriesIndicators
          },
          {
            type: FETCH_COUNTRIES_LIST_FAILURE,
            payload: 'Oops! Something went wrong and we couldn\'t ' +
              'initialize the list of countries'
          }
        ];

        createMasterDataService.mockImplementation(() => {
          return {
            extractCountriesList: () => Promise.reject(new Error('the error'))
          };
        });

        store.subscribe(() => {
          const actualActions = store.getActions();
          if (actualActions.length >= expectedActions.length) {
            expect(actualActions).toEqual(expectedActions);
            done();
          }
        });
        store.dispatch(fetchCountriesList(countriesIndicators));
      });
    });
  });

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
        countries: [],
        countrySelected: country,
        countrySelectedIndicators: [],
        countryIndicatorSelected: null
      }
    };

    describe('on success', () => {
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

        const extractCountryIndicatorsListSpy = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedCountryIndicators));
        createMasterDataService.mockImplementation(() => {
          return {
            extractCountryIndicatorsList: extractCountryIndicatorsListSpy
          };
        });

        store.subscribe(() => {
          const actualActions = store.getActions();
          if (actualActions.length >= expectedActions.length) {
            expect(actualActions).toEqual(expectedActions);
            expect(extractCountryIndicatorsListSpy)
            .toHaveBeenCalledWith({from: countriesIndicators, country});
            expect(extractCountryIndicatorsListSpy).toHaveBeenCalledTimes(1);
            done();
          }
        });
        store.dispatch(fetchCountryIndicators(payload));
      });
    });

    describe('on error', () => {
      test('dispatches FETCH_COUNTRY_INDICATORS_FAILURE action', (done) => {
        const store = mockStore(initialStateWithCountriesIndicators);
        sagaMiddleware.run(rootSaga);
        const expectedActions = [
          {
            type: FETCH_COUNTRY_INDICATORS,
            payload: country
          },
          {
            type: FETCH_COUNTRY_INDICATORS_FAILURE,
            payload: 'Oops! Something went wrong and we couldn\'t ' +
              'fetch the list of country indicators'
          }
        ];

        createMasterDataService.mockImplementation(() => {
          return {
            extractCountryIndicatorsList: () => Promise.reject(new Error('the error'))
          };
        });

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

  test('handles FETCH_COUNTRIES_LIST_SUCCESS', () => {
    const countries = ['usa', 'aus'];
    expect(
      reducer(undefined, {
        type: FETCH_COUNTRIES_LIST_SUCCESS,
        payload: countries
      })
    ).toEqual({
      ...reducerInitialState, countries
    });
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
});
