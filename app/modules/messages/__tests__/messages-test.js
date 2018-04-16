/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import reducer from '../reducers';
import { DISMISS_MESSAGE, dismissMessage } from '../actions';
import { LOGIN_SUCCESS_USER, SIGNUP_SUCCESS_USER } from '../../users/actions';

polyfill();

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {
  message: '',
  type: 'SUCCESS'
};

describe('Messages Actions', () => {
  let store;

  describe('dismissMessage', () => {
    test('should dispatch DISMISS_MESSAGE', () => {
      store = mockStore(initialState);
      const expectedActions = [
        {
          type: DISMISS_MESSAGE
        }
      ];

      store.dispatch(dismissMessage());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Message reducer', () => {
  const stateWithMessage = {
    message: 'a message',
    type: 'SUCCESS'
  };

  test('returns the initial state', () => {
    expect(
      reducer(undefined, {type: 'FOO'})
    ).toEqual(initialState);
  });

  test('handles LOGIN_SUCCESS_USER', () => {
    const payload = 'the message';
    expect(
      reducer(undefined, {type: LOGIN_SUCCESS_USER, payload})
    ).toEqual({
      ...initialState,
      message: payload
    });
  });

  test('handles SIGNUP_SUCCESS_USER', () => {
    const payload = 'the message';
    expect(
      reducer(undefined, {type: SIGNUP_SUCCESS_USER, payload})
    ).toEqual({
      ...initialState,
      message: payload
    });
  });

  test('handles DISMISS_MESSAGE', () => {
    expect(
      reducer(stateWithMessage, {type: DISMISS_MESSAGE})
    ).toEqual(initialState);
  });
});
