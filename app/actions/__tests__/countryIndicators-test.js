/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import 'babel-polyfill';
import expect from 'expect';
import sinon from 'sinon';
import * as actions from '../../actions/countryIndicators';
import rootSaga from '../../sagas/countryIndicators';
import * as types from '../../types';
import createCountryIndicatorServiceStub
  from '../../tests/helpers/createCountryIndicatorServiceStub';

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

describe('countryIndicators Actions', () => {
  let sandbox;

  afterEach(() => {
    sandbox.restore();
  });

  describe('#fetchCountryIndicatorData', () => {
    const country = 'united-states';
    const indicator = 'gdp';
    const initialStateWithCountrySelected = {
      masterData: {
        countriesIndicators: [],
        countries: [],
        countrySelected: country,
        countrySelectedIndicators: [],
        countryIndicatorSelected: null
      }
    };

    describe('when called with primitive (indicator) argument', () => {
      describe('on success', () => {
        it('dispatches FETCH_COUNTRY_INDICATOR_DATA and ' +
          'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS actions', (done) => {
          const store = mockStore(initialStateWithCountrySelected);
          sagaMiddleware.run(rootSaga);
          const expectedActions = [
            {
              type: types.FETCH_COUNTRY_INDICATOR_DATA,
              payload: indicator
            },
            {
              type: '@@router/CALL_HISTORY_METHOD',
              payload: {
                method: 'push',
                args: [`/data/${country}/${indicator}`]
              }
            },
            {
              type: types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
              payload: {
                countryIndicatorSelected: indicator,
                countrySelected: country
              }
            }
          ];

          const getCountryIndicator = () => Promise.resolve({
            data: {
              countrySelected: country,
              countryIndicatorSelected: indicator
            }
          });

          const spyGetCountryIndicator = sinon.spy(getCountryIndicator);
          sandbox = createCountryIndicatorServiceStub()
            .replace('getCountryIndicator')
            .with(spyGetCountryIndicator);

          store.subscribe(() => {
            const actualActions = store.getActions();
            if (actualActions.length >= expectedActions.length) {
              expect(actualActions).toEqual(expectedActions);
              expect(
                spyGetCountryIndicator
                .withArgs({indicator, country}).calledOnce
              ).toEqual(true);
              done();
            }
          });
          store.dispatch(actions.fetchCountryIndicatorData(indicator));
        });
      });

      describe('on error', () => {
        it('dispatches FETCH_COUNTRY_INDICATOR_FAILURE action', (done) => {
          const store = mockStore(initialStateWithCountrySelected);
          const expectedActions = [
            {
              type: types.FETCH_COUNTRY_INDICATOR_DATA
            },
            {
              type: types.FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
              error: new Error('the error')
            }
          ];

          sandbox = createCountryIndicatorServiceStub()
            .replace('getCountryIndicator')
            .with(() => Promise.reject(new Error('the error')));

          store.dispatch(actions.setCountryIndicatorSelected(indicator))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
