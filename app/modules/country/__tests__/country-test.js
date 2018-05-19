/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import { Link } from 'react-router';
import reducer from '../reducers';
import {
  FETCH_COUNTRY_DATA, FETCH_COUNTRY_DATA_SUCCESS, fetchCountryData,
  fetchCountryDataSuccess, buildIndicatorLink } from '../actions';
import rootSaga from '../sagas';
import { getCountry, getCountryDisplay, getCountryData,
  getCountryIndicators } from '../selectors';
import initialState, {
  emptyState
} from '../../../tests/helpers/initialState';

polyfill();

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const mockStore = configureStore(middlewares);

const reducerInitialState = emptyState.country;
const country = 'united-states';
const countryData = {
  country,
  countryLabel: 'United States',
  indicators: [
    {
      label: 'GDP',
      lastActual: '0.8%',
      lastPrevious: '0.7%',
      lastReleaseDate: 'Jan 23, 2005',
      value: 'gdp'
    },
    {
      label: 'New Home Sales MoM',
      lastActual: '1,000',
      lastPrevious: '2,000',
      lastReleaseDate: 'Jan 24, 2005',
      value: 'new-home-sales-mom'
    }
  ]
};

describe('country Actions', () => {
  describe('#buildIndicatorLink', () => {
    test('builds a Link from valueLabelAndCountry piped input', () => {
      const input = 'gdp|GDP|united-states';
      const link = buildIndicatorLink(input);
      expect(link.type).toEqual(Link);
      expect(link.props.children).toEqual('GDP');
      expect(link.props.to).toEqual('/data/united-states/gdp');
    });
  });

  describe('#fetchCountryData', () => {
    const expectedActionsSuccess = ({payload}) => {
      return [
        {
          type: FETCH_COUNTRY_DATA,
          payload
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'push',
            args: [`/data/${country}`]
          }
        },
        {
          type: FETCH_COUNTRY_DATA_SUCCESS,
          payload: countryData
        }
      ];
    };

    describe('when called with primitive payload (user selects country in UI)', () => {
      test('dispatches FETCH_COUNTRY_DATA and ' +
        'FETCH_COUNTRY_DATA_SUCCESS actions', (done) => {
        const payload = country;
        const store = mockStore(initialState);
        sagaMiddleware.run(rootSaga);
        const expectedActions = expectedActionsSuccess({payload});
        store.subscribe(() => {
          const actualActions = store.getActions();
          if (actualActions.length >= expectedActions.length) {
            expect(actualActions).toEqual(expectedActions);
            done();
          }
        });
        store.dispatch(fetchCountryData(payload));
      });
    });

    describe('when called with object payload',
    () => {
      test('dispatches FETCH_COUNTRY_DATA and ' +
        'FETCH_COUNTRY_DATA_SUCCESS actions', (done) => {
        const payload = {country};
        const store = mockStore(initialState);
        sagaMiddleware.run(rootSaga);
        const expectedActions = expectedActionsSuccess({payload});
        store.subscribe(() => {
          const actualActions = store.getActions();
          if (actualActions.length >= expectedActions.length) {
            expect(actualActions).toEqual(expectedActions);
            done();
          }
        });
        store.dispatch(fetchCountryData(payload));
      });
    });
  });
});

describe('country reducer', () => {
  test('returns the initial state', () => {
    expect(
      reducer(undefined, {type: 'FOO'})
    ).toEqual(reducerInitialState);
  });

  test('handles FETCH_COUNTRY_DATA_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: FETCH_COUNTRY_DATA_SUCCESS,
        payload: countryData
      })
    ).toEqual(countryData);
  });
});

describe('country selectors', () => {
  const state = {
    country: countryData,
    masterData: initialState.masterData
  };

  describe('getCountry', () => {
    test('retrieves the current country', () => {
      expect(getCountry(state))
      .toEqual(state.country.country);
    });
  });

  describe('getCountryDisplay', () => {
    test('retrieves the current country in display format', () => {
      expect(getCountryDisplay(state))
      .toEqual(state.country.countryLabel);
    });
  });

  describe('getCountryData', () => {
    test('retrieves the selected country data from masterData.countriesIndicators', () => {
      expect(getCountryData(state, country))
      .toEqual(countryData);
    });
  });

  describe('getCountryIndicators', () => {
    test('retrieves the current country indicators in format ready for table', () => {
      expect(getCountryIndicators(state))
      .toEqual(countryData.indicators.map(d => (
        { ...d, valueLabelAndCountry: `${d.value}|${d.label}|${country}` }
      )));
    });
  });
});
