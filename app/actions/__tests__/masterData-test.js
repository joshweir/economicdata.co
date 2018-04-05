/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import expect from 'expect';
import sinon from 'sinon';
import * as actions from '../../actions/masterData';
import * as types from '../../types';
import createMasterDataServiceStub
    from '../../tests/helpers/createMasterDataServiceStub';

polyfill();

const middlewares = [thunk];
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

describe('MasterData Actions', () => {
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
      it('dispatches FETCH_COUNTRIES_LIST and ' +
        'FETCH_COUNTRIES_LIST_SUCCESS actions', (done) => {
        const store = mockStore(initialState);
        const expectedActions = [
          {
            type: types.FETCH_COUNTRIES_LIST
          },
          {
            type: types.FETCH_COUNTRIES_LIST_SUCCESS,
            data: expectedCountriesList
          }
        ];

        const extractCountriesList = () => Promise.resolve(expectedCountriesList);

        const spyExtractCountriesList = sinon.spy(extractCountriesList);
        sandbox = createMasterDataServiceStub()
          .replace('extractCountriesList')
          .with(spyExtractCountriesList);

        store.dispatch(actions.extractCountriesList(countriesIndicators))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(
              spyExtractCountriesList
              .withArgs({from: countriesIndicators}).calledOnce
            ).toEqual(true);
            done();
          })
          .catch(done);
      });
    });

    describe('on error', () => {
      it('dispatches FETCH_COUNTRIES_LIST_FAILURE action', (done) => {
        const store = mockStore(initialState);
        const expectedActions = [
          {
            type: types.FETCH_COUNTRIES_LIST
          },
          {
            type: types.FETCH_COUNTRIES_LIST_FAILURE,
            error: 'Oops! Something went wrong and we couldn\'t ' +
              'initialize the list of countries'
          }
        ];

        sandbox = createMasterDataServiceStub()
          .replace('extractCountriesList')
          .with(() => Promise.reject(new Error('the error')));

        store.dispatch(actions.extractCountriesList(countriesIndicators))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#setCountrySelected', () => {
    const country = 'united-states';
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
      it('dispatches SELECT_COUNTRY action', (done) => {
        const store = mockStore(initialStateWithCountriesIndicators);
        const expectedActions = [
          {
            type: types.SELECT_COUNTRY,
            data: {
              country,
              countryIndicators: expectedCountryIndicators
            }
          }
        ];

        const extractCountryIndicatorsList =
          () => Promise.resolve(expectedCountryIndicators);

        const spyExtractCountryIndicatorsList =
          sinon.spy(extractCountryIndicatorsList);
        sandbox = createMasterDataServiceStub()
          .replace('extractCountryIndicatorsList')
          .with(spyExtractCountryIndicatorsList);

        store.dispatch(actions.setCountrySelected(country))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(
              spyExtractCountryIndicatorsList
              .withArgs({from: countriesIndicators, country}).calledOnce
            ).toEqual(true);
            done();
          })
          .catch(done);
      });
    });

    describe('on error', () => {
      it('dispatches FETCH_COUNTRY_INDICATORS_FAILURE action', (done) => {
        const store = mockStore(initialStateWithCountriesIndicators);
        const expectedActions = [
          {
            type: types.FETCH_COUNTRY_INDICATORS_FAILURE,
            error: 'Oops! Something went wrong and we couldn\'t ' +
              'fetch the list of country indicators'
          }
        ];

        sandbox = createMasterDataServiceStub()
          .replace('extractCountryIndicatorsList')
          .with(() => Promise.reject(new Error('the error')));

        store.dispatch(actions.setCountrySelected(country))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });
});
