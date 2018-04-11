import expect from 'expect';
import reducer from '../../reducers';

describe('Root reducer', () => {
  const initialState = {
    countryIndicator: {
      indicatorData: [],
      indicatorInfo: {}
    },
    isFetching: false,
    masterData: {
      countries: [],
      countriesIndicators: [],
      countryIndicatorSelected: null,
      countrySelected: null,
      countrySelectedIndicators: []
    },
    message: {
      message: '',
      type: 'SUCCESS'
    },
    routing: {
      locationBeforeTransitions: null
    },
    user: {
      authenticated: false,
      isLogin: true,
      isWaiting: false,
      message: ''
    }
  };

  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });
});
