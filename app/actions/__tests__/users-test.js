import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/users';
import * as types from '../../types';
import authService from '../../services/authentication';

jest.mock('../../services/authentication');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Users Async Actions', () => {
  let store;

  const initialState = {
    isLogin: true,
    message: '',
    isWaiting: false,
    authenticated: false
  };

  const data = {
    email: 'hello@world.com',
    password: '2BeOrNot2Be'
  };

  describe('manualLogin', () => {
    describe('on success', () => {
      beforeEach(() => {
        authService.mockImplementation(() => {
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
              type: types.MANUAL_LOGIN_USER
            },
            {
              type: types.LOGIN_SUCCESS_USER,
              message: 'You have been successfully logged in'
            },
            {
              payload: {
                args: ['/'],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            }
          ];

          store.dispatch(actions.manualLogin(data))
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
        authService.mockImplementation(() => {
          return {
            login: () => Promise.reject({ status: 401 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch MANUAL_LOGIN_USER and LOGIN_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.MANUAL_LOGIN_USER
          },
          {
            type: types.LOGIN_ERROR_USER,
            message: 'Oops! Invalid username or password'
          }
        ];

        store.dispatch(actions.manualLogin(data))
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
        authService.mockImplementation(() => {
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
              type: types.SIGNUP_USER
            },
            {
              type: types.SIGNUP_SUCCESS_USER,
              message: 'You have successfully registered an account!'
            },
            {
              payload: {
                args: ['/'],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            }
          ];

          store.dispatch(actions.signUp(data))
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
        authService.mockImplementation(() => {
          return {
            signUp: () => Promise.reject({ status: 401 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch MANUAL_LOGIN_USER and LOGIN_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.SIGNUP_USER
          },
          {
            type: types.SIGNUP_ERROR_USER,
            message: 'Oops! Something went wrong when signing up'
          }
        ];

        store.dispatch(actions.signUp(data))
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
        authService.mockImplementation(() => {
          return {
            logOut: () => Promise.resolve({ status: 200 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch LOGOUT_USER, LOGOUT_SUCCESS_USER', (done) => {
        const expectedActions = [
          {
            type: types.LOGOUT_USER
          },
          {
            type: types.LOGOUT_SUCCESS_USER
          }
        ];

        store.dispatch(actions.logOut(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        authService.mockImplementation(() => {
          return {
            logOut: () => Promise.reject({ status: 401 })
          };
        });
        store = mockStore(initialState);
      });

      test('should dispatch LOGOUT_USER, LOGOUT_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.LOGOUT_USER
          },
          {
            type: types.LOGOUT_ERROR_USER
          }
        ];

        store.dispatch(actions.logOut(data))
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
          type: types.TOGGLE_LOGIN_MODE
        }
      ];

      store.dispatch(actions.toggleLoginMode());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
