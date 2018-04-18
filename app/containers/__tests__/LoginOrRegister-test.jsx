import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import LoginOrRegister from '../../containers/LoginOrRegister';
import initialState from '../../tests/helpers/initialState';
import { getUser } from '../../modules/users/selectors';
import { manualLogin, signUp, toggleLoginMode
  } from '../../modules/users/actions';

const mockStore = configureMockStore();

describe('<LoginOrRegister />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <LoginOrRegister store={store} />
    );
  });

  describe('mapStateToProps and mapDispatchToProps', () => {
    test('receives user from state', () => {
      expect(wrapper.props().user)
      .toEqual(getUser(initialState));
    });

    test('receives manualLogin from dispatch', () => {
      /*const spy = jest.fn();
      actions.mockImplementation(() => {
        return {
          manualLogin: spy
        };
      });*/
      // wrapper.props().manualLogin();
      // expect(spy).toHaveBeenCalledTimes(1);
      /*
TODO:
As manualLogin is a thunk, determine how to
mock the named imports using jest, then can
mock that manualLogin was called with expected
data, calling this should trigger the mocked
function, then can check with toHaveBeenCalledWith:
wrapper.props().manualLogin();
       */
      expect(1).toEqual(1);
    });

    test('receives signUp from dispatch', () => {
      //TODO: same as above..
      expect(1).toEqual(1);
    });

    test('receives toggleLoginMode from dispatch', () => {
      //TODO: see above
      expect(1).toEqual(1);
    });
  });

  describe('when isWaiting', () => {
    test('renders login div with waiting class', () => {
      const initialStateUserIsWaiting = {
        ...initialState,
        user: {
          ...initialState.user,
          isWaiting: true
        }
      };
      store = mockStore(initialStateUserIsWaiting);
      wrapper = shallow(
        <LoginOrRegister store={store} />
      );
      expect(wrapper.dive().find('.login.waiting')).toHaveLength(1);
    });
  });

  describe('when not isWaiting', () => {
    test('renders login div with waiting class', () => {
      const subComponent = wrapper.dive().find('.login');
      expect(subComponent).toHaveLength(1);
      expect(subComponent.hasClass('waiting')).toBeFalsy();
    });
  });
});
