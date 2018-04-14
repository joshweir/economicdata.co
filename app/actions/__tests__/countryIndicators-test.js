/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import * as actions from '../../actions/countryIndicators';
import rootSaga from '../../sagas/countryIndicators';
import * as types from '../../types';
import createCountryIndicatorService from '../../services/countryIndicator';

jest.mock('../../services/countryIndicator');

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

    const expectedActionsSuccess = ({payload}) => {
      return [
        {
          type: types.FETCH_COUNTRY_INDICATOR_DATA,
          payload
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
    };

    const expectedActionsError = ({payload}) => {
      return [
        {
          type: types.FETCH_COUNTRY_INDICATOR_DATA,
          payload
        },
        {
          type: types.FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
          payload: new Error('the error'),
          error: true
        }
      ];
    };

    const mockApiForSuccess = () => {
      const spy = jest.fn().mockImplementation(() => Promise.resolve({
        data: {
          countrySelected: country,
          countryIndicatorSelected: indicator
        }
      }));
      createCountryIndicatorService.mockImplementation(() => {
        return {
          getCountryIndicator: spy
        };
      });
      return spy;
    };

    const mockApiForError = () => {
      createCountryIndicatorService.mockImplementation(() => {
        return {
          getCountryIndicator: () => Promise.reject(new Error('the error'))
        };
      });
    };

    describe('when called with primitive payload (user selects indicator in UI)', () => {
      const payload = indicator;
      describe('on success', () => {
        test('dispatches FETCH_COUNTRY_INDICATOR_DATA and ' +
          'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS actions', (done) => {
          const getCountryIndicatorSpy = mockApiForSuccess();

          const store = mockStore(initialStateWithCountrySelected);
          sagaMiddleware.run(rootSaga);
          const expectedActions = expectedActionsSuccess({payload});

          store.subscribe(() => {
            const actualActions = store.getActions();
            if (actualActions.length >= expectedActions.length) {
              expect(actualActions).toEqual(expectedActions);
              expect(getCountryIndicatorSpy).toHaveBeenCalledWith({indicator, country});
              expect(getCountryIndicatorSpy).toHaveBeenCalledTimes(1);
              done();
            }
          });
          store.dispatch(actions.fetchCountryIndicatorData(payload));
        });
      });

      describe('on error', () => {
        test('dispatches FETCH_COUNTRY_INDICATOR_FAILURE action', (done) => {
          const store = mockStore(initialStateWithCountrySelected);
          sagaMiddleware.run(rootSaga);
          const expectedActions = expectedActionsError({payload});

          mockApiForError();

          store.subscribe(() => {
            const actualActions = store.getActions();
            if (actualActions.length >= expectedActions.length) {
              expect(actualActions).toEqual(expectedActions);
              done();
            }
          });
          store.dispatch(actions.fetchCountryIndicatorData(payload));
        });
      });
    });

    describe('when called with object payload (SSR)', () => {
      const payload = {indicator, country};
      describe('on success', () => {
        test('dispatches FETCH_COUNTRY_INDICATOR_DATA and ' +
          'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS actions', (done) => {
          const getCountryIndicatorSpy = mockApiForSuccess();
          const store = mockStore(initialState);
          sagaMiddleware.run(rootSaga);
          const expectedActions = expectedActionsSuccess({payload});

          store.subscribe(() => {
            const actualActions = store.getActions();
            if (actualActions.length >= expectedActions.length) {
              expect(actualActions).toEqual(expectedActions);
              expect(getCountryIndicatorSpy)
              .toHaveBeenCalledWith({indicator, country});
              expect(getCountryIndicatorSpy).toHaveBeenCalledTimes(1);
              done();
            }
          });
          store.dispatch(actions.fetchCountryIndicatorData(payload));
        });
      });

      describe('on error', () => {
        test('dispatches FETCH_COUNTRY_INDICATOR_FAILURE action', (done) => {
          const store = mockStore(initialStateWithCountrySelected);
          sagaMiddleware.run(rootSaga);
          const expectedActions = expectedActionsError({payload});

          mockApiForError();

          store.subscribe(() => {
            const actualActions = store.getActions();
            if (actualActions.length >= expectedActions.length) {
              expect(actualActions).toEqual(expectedActions);
              done();
            }
          });
          store.dispatch(actions.fetchCountryIndicatorData(payload));
        });
      });
    });
  });
});
