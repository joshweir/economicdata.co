/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import reducer from '../reducers';
import {
  MANUAL_LOGIN_USER, LOGIN_SUCCESS_USER, LOGIN_ERROR_USER, SIGNUP_USER,
  SIGNUP_SUCCESS_USER, SIGNUP_ERROR_USER, LOGOUT_USER, LOGOUT_SUCCESS_USER,
  LOGOUT_ERROR_USER, TOGGLE_LOGIN_MODE,
  manualLogin, beginLogin, signUp, logOut, toggleLoginMode } from '../actions';
import api from '../api';

jest.mock('../api');
polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false
};
const reducerInitialState = {
  indicatorInfo: {},
  indicatorData: []
};

describe('Users Async Actions', () => {
  let store;

  const data = {
    email: 'hello@world.com',
    password: '2BeOrNot2Be'
  };

  describe('manualLogin', () => {
    describe('on success', () => {
      beforeEach(() => {
        api.mockImplementation(() => {
          return {
            login: () => Promise.resolve({ status: 200 })
          };
        });
        store = mockStore(initialState);
      });

      test(
        'should dispatch MANUAL_LOGIN_USER, LOGIN_SUCCESS_USER and route path change actions',
        (done) => {
          const expectedActions = [
            {
              type: MANUAL_LOGIN_USER
            },
            {
              type: LOGIN_SUCCESS_USER,
              payload: 'You have been successfully logged in'
            },
            {
              payload: {
                args: ['/'],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            }
          ];

          store.dispatch(manualLogin(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        }
      );
    });

    describe('on failure', () => {
      beforeEach(() => {
        api.mockImplementation(() => {
          return {
            login: () => Promise.reject({ status: 401 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch MANUAL_LOGIN_USER and LOGIN_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: MANUAL_LOGIN_USER
          },
          {
            type: LOGIN_ERROR_USER,
            payload: 'Oops! Invalid username or password'
          }
        ];

        store.dispatch(manualLogin(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('signUp', () => {
    describe('on success', () => {
      beforeEach(() => {
        api.mockImplementation(() => {
          return {
            signUp: () => Promise.resolve({ status: 200 })
          };
        });
        store = mockStore(initialState);
      });

      test(
        'should dispatch SIGNUP_USER, SIGNUP_SUCCESS_USER and route path change actions',
        (done) => {
          const expectedActions = [
            {
              type: SIGNUP_USER
            },
            {
              type: SIGNUP_SUCCESS_USER,
              payload: 'You have successfully registered an account!'
            },
            {
              payload: {
                args: ['/'],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            }
          ];

          store.dispatch(signUp(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        }
      );
    });

    describe('on failure', () => {
      beforeEach(() => {
        api.mockImplementation(() => {
          return {
            signUp: () => Promise.reject({ status: 401 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch MANUAL_LOGIN_USER and LOGIN_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: SIGNUP_USER
          },
          {
            type: SIGNUP_ERROR_USER,
            payload: 'Oops! Something went wrong when signing up'
          }
        ];

        store.dispatch(signUp(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('logOut', () => {
    describe('on success', () => {
      beforeEach(() => {
        api.mockImplementation(() => {
          return {
            logOut: () => Promise.resolve({ status: 200 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch LOGOUT_USER, LOGOUT_SUCCESS_USER', (done) => {
        const expectedActions = [
          {
            type: LOGOUT_USER
          },
          {
            type: LOGOUT_SUCCESS_USER
          }
        ];

        store.dispatch(logOut(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        api.mockImplementation(() => {
          return {
            logOut: () => Promise.reject({ status: 401 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch LOGOUT_USER, LOGOUT_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: LOGOUT_USER
          },
          {
            type: LOGOUT_ERROR_USER
          }
        ];

        store.dispatch(logOut(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('toggleLoginMode', () => {
    test('should dispatch TOGGLE_LOGIN_MODE', () => {
      store = mockStore(initialState);
      const expectedActions = [
        {
          type: TOGGLE_LOGIN_MODE
        }
      ];

      store.dispatch(toggleLoginMode());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Users reducer', () => {
  test('returns the initial state', () => {
    expect(
      reducer(undefined, {type: 'FOO'})
    ).toEqual(initialState);
  });

  test('handles MANUAL_LOGIN_USER', () => {
    expect(
      reducer(undefined, {type: MANUAL_LOGIN_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  test('handles LOGIN_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: LOGIN_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true,
      message: ''
    });
  });

  test('handles LOGIN_ERROR_USER', () => {
    const payload = 'Success';
    expect(
      reducer(undefined, {type: LOGIN_ERROR_USER, payload})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: false,
      message: payload
    });
  });

  test('handles SIGNUP_USER', () => {
    expect(
      reducer(undefined, {type: SIGNUP_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  test('handles SIGNUP_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: SIGNUP_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true
    });
  });

  test('handles SIGNUP_ERROR_USER', () => {
    const payload = 'Oops! Something went wrong!';
    expect(
      reducer(undefined, {type: SIGNUP_ERROR_USER, payload})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: false,
      message: payload
    });
  });

  test('handles LOGOUT_USER', () => {
    expect(
      reducer(undefined, {type: LOGOUT_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  test('handles LOGOUT_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: LOGOUT_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: false
    });
  });

  test('handles LOGOUT_ERROR_USER', () => {
    const payload = 'Oops! Something went wrong!';
    expect(
      reducer(undefined, {type: LOGOUT_ERROR_USER, payload})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true,
      isLogin: true,
      message: payload
    });
  });

  test('handles TOGGLE_LOGIN_MODE', () => {
    expect(
      reducer(undefined, {type: TOGGLE_LOGIN_MODE})
    ).toEqual({
      ...initialState,
      isLogin: false
    });
  });
});
