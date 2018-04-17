/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import reducer from '../reducers';
import {
  FETCH_COUNTRY_INDICATOR_DATA, FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
  FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
  fetchCountryIndicatorData, fetchCountryIndicatorDataSuccess,
  fetchCountryIndicatorDataFailure } from '../actions';
import rootSaga from '../sagas';
import api from '../api';
import { getIndicatorInfo, getIndicatorData } from '../selectors';

jest.mock('../api');
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
const reducerInitialState = {
  indicatorInfo: {},
  indicatorData: []
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
          type: FETCH_COUNTRY_INDICATOR_DATA,
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
          type: FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
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
          type: FETCH_COUNTRY_INDICATOR_DATA,
          payload
        },
        {
          type: FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
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
      api.mockImplementation(() => {
        return {
          getCountryIndicator: spy
        };
      });
      return spy;
    };

    const mockApiForError = () => {
      api.mockImplementation(() => {
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
          store.dispatch(fetchCountryIndicatorData(payload));
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
          store.dispatch(fetchCountryIndicatorData(payload));
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
          store.dispatch(fetchCountryIndicatorData(payload));
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
          store.dispatch(fetchCountryIndicatorData(payload));
        });
      });
    });
  });
});

describe('countryIndicator reducer', () => {
  test('returns the initial state', () => {
    expect(
      reducer(undefined, {type: 'FOO'})
    ).toEqual(reducerInitialState);
  });

  test('handles FETCH_COUNTRY_INDICATOR_DATA_SUCCESS', () => {
    const indicatorInfo = {foo: 'bar'};
    const indicatorData = ['the', 'data'];
    expect(
      reducer(undefined, {
        type: FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
        payload: {indicatorInfo, indicatorData}
      })
    ).toEqual({
      ...reducerInitialState, indicatorInfo, indicatorData
    });
  });
});

describe('countryIndicators selectors', () => {
  const state = {
    countryIndicator: {
      indicatorInfo: 'indicator info',
      indicatorData: 'indicator data'
    }
  };

  describe('getIndicatorInfo', () => {
    test('it retrieves the indicator info', () => {
      expect(getIndicatorInfo(state))
      .toEqual(state.countryIndicator.indicatorInfo);
    });
  });

  describe('getIndicatorData', () => {
    test('it retrieves the indicator data', () => {
      expect(getIndicatorInfo(state))
      .toEqual(state.countryIndicator.indicatorInfo);
    });
  });
});
