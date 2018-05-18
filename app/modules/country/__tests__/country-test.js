/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import reducer from '../reducers';
import {
  FETCH_COUNTRY_INDICATOR_DATA, FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
  FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
  FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS, LOAD_MORE_INDICATOR_DATA,
  fetchCountryIndicatorData, fetchCountryIndicatorDataSuccess,
  fetchCountryIndicatorDataFailure, fetchMoreCountryIndicatorDataSuccess,
  loadMoreIndicatorData } from '../actions';
import rootSaga from '../sagas';
import { getIndicatorInfo, getIndicatorData, getCountryDisplay,
  getCountryIndicatorDisplay, getMoreToLoad, getReleaseDateBefore,
  getReleaseDateBeforeXmlFormat, getCountry,
  getCountryIndicator } from '../selectors';
import { getCountrySelected,
  getCountryIndicatorSelected } from '../../masterData/selectors';
import initialState, {
  emptyState
} from '../../../tests/helpers/initialState';

polyfill();

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const mockStore = configureStore(middlewares);

const reducerInitialState = emptyState.countryIndicator;

describe('countryIndicators Actions', () => {
  const country = 'united-states';
  const indicator = 'new-home-sales-mom';
  const releaseDateBefore = 'Jan 22, 2005';
  const releaseDateBeforeXmlFormat = '2005-01-22';
  const indicatorData = [
    {
      actual: '12,250,000',
      forecast: '13,250,000',
      previous: '11,250,000',
      releaseDate: 'Jan 23, 2005',
      time: '10:00'
    },
    {
      actual: '12,250,001',
      forecast: '13,250,001',
      previous: '11,250,001',
      releaseDate: 'Jan 22, 2005'
    }
  ];
  const indicatorDataMore = [
    {
      releaseDate: 'Jan 1, 2004',
      time: '05:00',
      actual: '0.8%',
      forecast: '0.9%',
      previous: '0.7%'
    }
  ];
  const apiResponseSuccess = {
    countryIndicatorSelected: indicator,
    countrySelected: country,
    indicatorData,
    moreToLoad: true
  };
  const apiResponseSuccessMore = {
    ...apiResponseSuccess,
    indicatorData: indicatorDataMore,
    moreToLoad: false
  };
  const emptyStateWithCountrySelected = {
    masterData: {
      countriesIndicators: [],
      countries: [],
      countrySelected: country,
      countrySelectedIndicators: [],
      countryIndicatorSelected: null
    }
  };

  describe('#fetchCountryIndicatorData', () => {
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
          payload: apiResponseSuccess
        }
      ];
    };

    const expectedActionsSuccessMore = ({payload}) => {
      return [
        {
          type: FETCH_COUNTRY_INDICATOR_DATA,
          payload
        },
        {
          type: FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS,
          payload: apiResponseSuccessMore
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

    describe('when called with primitive payload (user selects indicator in UI)', () => {
      const payload = indicator;
      describe('on success', () => {
        test('dispatches FETCH_COUNTRY_INDICATOR_DATA and ' +
          'FETCH_COUNTRY_INDICATOR_DATA_SUCCESS actions', (done) => {
          const getCountryIndicatorSpy = mockApiForSuccess();

          const store = mockStore(emptyStateWithCountrySelected);
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
          const store = mockStore(emptyStateWithCountrySelected);
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

    describe('when called with object payload without releaseDateBefore',
    () => {
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
          const store = mockStore(emptyStateWithCountrySelected);
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

    describe('when called with object payload with releaseDateBefore',
    () => {
      const payload = {indicator, country, releaseDateBefore};
      describe('on success', () => {
        test('dispatches FETCH_COUNTRY_INDICATOR_DATA and ' +
          'FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS actions', (done) => {
          const getCountryIndicatorSpy = mockApiForSuccessMore();
          const store = mockStore(emptyState);
          sagaMiddleware.run(rootSaga);
          const expectedActions = expectedActionsSuccessMore({payload});

          store.subscribe(() => {
            const actualActions = store.getActions();
            if (actualActions.length >= expectedActions.length) {
              expect(actualActions).toEqual(expectedActions);
              expect(getCountryIndicatorSpy)
              .toHaveBeenCalledWith({indicator, country, releaseDateBefore});
              expect(getCountryIndicatorSpy).toHaveBeenCalledTimes(1);
              done();
            }
          });
          store.dispatch(fetchCountryIndicatorData(payload));
        });
      });

      describe('on error', () => {
        test('dispatches FETCH_COUNTRY_INDICATOR_FAILURE action', (done) => {
          const store = mockStore(emptyStateWithCountrySelected);
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

  describe('#loadMoreIndicatorData', () => {
    const expectedActionsLoadMore = () => {
      return [
        {
          type: LOAD_MORE_INDICATOR_DATA
        },
        {
          type: FETCH_COUNTRY_INDICATOR_DATA,
          payload: {
            country,
            indicator,
            releaseDateBefore: releaseDateBeforeXmlFormat
          }
        },
        {
          type: FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS,
          payload: apiResponseSuccessMore
        }
      ];
    };

    test('dispatches FETCH_COUNTRY_INDICATOR_DATA action', (done) => {
      const getCountryIndicatorSpy = mockApiForSuccessMore();
      const store = mockStore(initialState);
      sagaMiddleware.run(rootSaga);
      const expectedActions = expectedActionsLoadMore();

      store.subscribe(() => {
        const actualActions = store.getActions();
        if (actualActions.length >= expectedActions.length) {
          expect(actualActions).toEqual(expectedActions);
          expect(getCountryIndicatorSpy)
          .toHaveBeenCalledWith({
            indicator,
            country,
            releaseDateBefore: releaseDateBeforeXmlFormat
          });
          expect(getCountryIndicatorSpy).toHaveBeenCalledTimes(1);
          done();
        }
      });
      store.dispatch(loadMoreIndicatorData());
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
    const moreToLoad = true;
    expect(
      reducer(undefined, {
        type: FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
        payload: {indicatorInfo, indicatorData, moreToLoad}
      })
    ).toEqual({
      ...reducerInitialState, indicatorInfo, indicatorData, moreToLoad
    });
  });

  test('handles FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS', () => {
    const indicatorInfo = {foo: 'bar'};
    const indicatorData = ['the', 'data'];
    const moreToLoad = false;
    const initialStateIndicatorLoaded = {
      indicatorData: ['initial'],
      indicatorInfo,
      moreToLoad: true
    };
    expect(
      reducer(initialStateIndicatorLoaded, {
        type: FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS,
        payload: {indicatorInfo, indicatorData, moreToLoad}
      })
    ).toEqual({
      ...reducerInitialState,
      indicatorInfo,
      indicatorData: [...initialStateIndicatorLoaded.indicatorData, ...indicatorData],
      moreToLoad
    });
  });
});

describe('countryIndicators selectors', () => {
  const releaseDateBefore = 'Jan 22, 2005';
  const releaseDateBeforeXmlFormat = '2005-01-22';
  const state = {
    countryIndicator: {
      indicatorInfo: 'indicator info',
      indicatorData: [
        {
          actual: '12,250,000',
          forecast: '13,250,000',
          previous: '11,250,000',
          releaseDate: 'Jan 23, 2005',
          time: '10:00'
        },
        {
          actual: '12,250,001',
          forecast: '13,250,001',
          previous: '11,250,001',
          releaseDate: releaseDateBefore
        }
      ],
      moreToLoad: true
    }
  };

  describe('getIndicatorInfo', () => {
    test('retrieves the indicator info', () => {
      expect(getIndicatorInfo(state))
      .toEqual(state.countryIndicator.indicatorInfo);
    });
  });

  describe('getCountry', () => {
    test('retrieves the current country from indicatorInfo', () => {
      expect(getCountry(state))
      .toEqual(state.countryIndicator.indicatorInfo.country);
    });
  });

  describe('getCountryIndicator', () => {
    test('retrieves the current indicator from indicatorInfo', () => {
      expect(getCountryIndicator(state))
      .toEqual(state.countryIndicator.indicatorInfo.indicator);
    });
  });

  describe('getIndicatorData', () => {
    test('retrieves the indicator data', () => {
      expect(getIndicatorInfo(state))
      .toEqual(state.countryIndicator.indicatorInfo);
    });
  });

  describe('getCountryDisplay', () => {
    test('retrieves the selected country in display format', () => {
      expect(getCountryDisplay(state))
      .toEqual(state.countryIndicator.indicatorInfo.countryDisplay);
    });
  });

  describe('getCountryIndicatorDisplay', () => {
    test('retrieves the selected country indicator in display format', () => {
      expect(getCountryIndicatorDisplay(state))
      .toEqual(state.countryIndicator.indicatorInfo.indicatorDisplay);
    });
  });

  describe('getMoreToLoad', () => {
    test('retrieves a boolean whether there is more data to load from ' +
      'server for current country indicator', () => {
      expect(getMoreToLoad(state))
      .toEqual(state.countryIndicator.moreToLoad);
    });
  });

  describe('getReleaseDateBefore', () => {
    test('retrieves the releaseDate value for the last indicatorData value',
    () => {
      expect(getReleaseDateBefore(state))
      .toEqual(releaseDateBefore);
    });

    test('returns null if indicatorData is empty', () => {
      const stateWithEmptyIndicatorData = {
        ...state,
        countryIndicator: {
          ...state.countryIndicator,
          indicatorData: null
        }
      };
      expect(getReleaseDateBefore(stateWithEmptyIndicatorData))
      .toEqual(null);
    });
  });

  describe('getReleaseDateBeforeXmlFormat', () => {
    test('retrieves the releaseDate value for the last indicatorData value ' +
      'in format YYYY-MM-DD',
    () => {
      expect(getReleaseDateBeforeXmlFormat(state))
      .toEqual(releaseDateBeforeXmlFormat);
    });

    test('returns null if indicatorData is empty', () => {
      const stateWithEmptyIndicatorData = {
        ...state,
        countryIndicator: {
          ...state.countryIndicator,
          indicatorData: null
        }
      };
      expect(getReleaseDateBeforeXmlFormat(stateWithEmptyIndicatorData))
      .toEqual(null);
    });
  });
});
