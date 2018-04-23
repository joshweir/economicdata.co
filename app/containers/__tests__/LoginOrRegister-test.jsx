import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import LoginOrRegister from '../../containers/LoginOrRegister';
import initialState from '../../tests/helpers/initialState';
import { getUser } from '../../modules/users/selectors';
import { manualLogin, signUp, toggleLoginMode
  } from '../../modules/users/actions';

jest.mock('../../modules/users/actions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
      manualLogin.mockImplementation(() => {
        return jest.fn();
      });
      wrapper.props().manualLogin();
      expect(manualLogin).toHaveBeenCalledTimes(1);
    });

    test('receives signUp from dispatch', () => {
      signUp.mockImplementation(() => {
        return jest.fn();
      });
      wrapper.props().signUp();
      expect(signUp).toHaveBeenCalledTimes(1);
    });

    test('receives toggleLoginMode from dispatch', () => {
      toggleLoginMode.mockImplementation(() => {
        return jest.fn();
      });
      wrapper.props().toggleLoginMode();
      expect(toggleLoginMode).toHaveBeenCalledTimes(1);
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
