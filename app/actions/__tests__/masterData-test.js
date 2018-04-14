/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import 'babel-polyfill';
import sinon from 'sinon';
import * as actions from '../../actions/masterData';
import rootSaga from '../../sagas/masterData';
import * as types from '../../types';
import createMasterDataServiceStub
  from '../../tests/helpers/createMasterDataServiceStub';

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
  let sandbox;

  afterEach(() => {
    sandbox.restore();
  });

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

        const extractCountriesList = () => Promise.resolve(expectedCountriesList);

        const spyExtractCountriesList = sinon.spy(extractCountriesList);
        sandbox = createMasterDataServiceStub()
          .replace('extractCountriesList')
          .with(spyExtractCountriesList);

        store.subscribe(() => {
          const actualActions = store.getActions();
          if (actualActions.length >= expectedActions.length) {
            expect(actualActions).toEqual(expectedActions);
            expect(
              spyExtractCountriesList
              .withArgs({from: countriesIndicators}).calledOnce
            ).toEqual(true);
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

        sandbox = createMasterDataServiceStub()
          .replace('extractCountriesList')
          .with(() => Promise.reject(new Error('the error')));

        /*
        store.dispatch(actions.extractCountriesList(countriesIndicators))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
        */
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

        const extractCountryIndicatorsList =
          () => Promise.resolve(expectedCountryIndicators);

        const spyExtractCountryIndicatorsList =
          sinon.spy(extractCountryIndicatorsList);
        sandbox = createMasterDataServiceStub()
          .replace('extractCountryIndicatorsList')
          .with(spyExtractCountryIndicatorsList);

        store.subscribe(() => {
          const actualActions = store.getActions();
          if (actualActions.length >= expectedActions.length) {
            expect(actualActions).toEqual(expectedActions);
            expect(
              spyExtractCountryIndicatorsList
              .withArgs({from: countriesIndicators, country}).calledOnce
            ).toEqual(true);
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

        sandbox = createMasterDataServiceStub()
          .replace('extractCountryIndicatorsList')
          .with(() => Promise.reject(new Error('the error')));

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
