import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../actions/messages';
import * as types from '../../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Messages Actions', () => {
  let store;

  const initialState = {
    isLogin: true,
    message: '',
    isWaiting: false,
    authenticated: false
  };

  describe('dismissMessage', () => {
    it('should dispatch DISMISS_MESSAGE', () => {
      store = mockStore(initialState);
      const expectedActions = [
        {
          type: types.DISMISS_MESSAGE
        }
      ];

      store.dispatch(actions.dismissMessage());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
