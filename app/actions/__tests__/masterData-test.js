/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import * as actions from '../../actions/masterData';
import rootSaga from '../../sagas/masterData';
import * as types from '../../types';
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
            type: types.FETCH_COUNTRIES_LIST,
            payload: countriesIndicators
          },
          {
            type: types.FETCH_COUNTRIES_LIST_SUCCESS,
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
        store.dispatch(actions.fetchCountriesList(countriesIndicators));
      });
    });

    describe('on error', () => {
      test('dispatches FETCH_COUNTRIES_LIST_FAILURE action', (done) => {
        const store = mockStore(initialState);
        sagaMiddleware.run(rootSaga);
        const expectedActions = [
          {
            type: types.FETCH_COUNTRIES_LIST,
            payload: countriesIndicators
          },
          {
            type: types.FETCH_COUNTRIES_LIST_FAILURE,
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
        store.dispatch(actions.fetchCountriesList(countriesIndicators));
      });
    });
  });

  describe('#selectCountry', () => {
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
      test('dispatches SELECT_COUNTRY action', (done) => {
        const store = mockStore(initialStateWithCountriesIndicators);
        sagaMiddleware.run(rootSaga);
        const expectedActions = [
          {
            type: types.SELECT_COUNTRY,
            payload: country
          },
          {
            type: types.FETCH_COUNTRY_INDICATORS_SUCCESS,
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
        store.dispatch(actions.selectCountry(payload));
      });
    });

    describe('on error', () => {
      test('dispatches FETCH_COUNTRY_INDICATORS_FAILURE action', (done) => {
        const store = mockStore(initialStateWithCountriesIndicators);
        sagaMiddleware.run(rootSaga);
        const expectedActions = [
          {
            type: types.SELECT_COUNTRY,
            payload: country
          },
          {
            type: types.FETCH_COUNTRY_INDICATORS_FAILURE,
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
        store.dispatch(actions.selectCountry(payload));
      });
    });
  });
});
