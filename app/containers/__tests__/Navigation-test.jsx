import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router';
import thunk from 'redux-thunk';
import Navigation from '../../containers/Navigation';
import initialState from '../../tests/helpers/initialState';
import { logOut } from '../../modules/users/actions';
import { getUser } from '../../modules/users/selectors';
import NavItem from '../../components/NavItem';

jest.mock('../../modules/users/actions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Navigation />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Navigation store={store} />
    );
  });

  describe('mapStateToProps and mapDispatchToProps', () => {
    test('receives user from state', () => {
      expect(wrapper.props().user)
      .toEqual(getUser(initialState));
    });

    test('receives logOut from dispatch', () => {
      logOut.mockImplementation(() => {
        return jest.fn();
      });
      wrapper.props().logOut();
      expect(logOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('<NavItem>s', () => {
    test('renders the default <NavItem>s', () => {
      const [indexComponent, aboutComponent] =
      wrapper.dive().find('.navbar-nav')
      .find(NavItem);
      expect(indexComponent.props.to).toEqual('/');
      expect(aboutComponent.props.to).toEqual('/about');
    });
  });

  describe('when user is authenticated', () => {
    test('the sign out <NavItem> is rendered with logOut action', () => {
      const initialStateUserAuthenticated = {
        ...initialState,
        user: {
          ...initialState.user,
          authenticated: true
        }
      };
      store = mockStore(initialStateUserAuthenticated);
      wrapper = shallow(
        <Navigation store={store} />
      );
      const [,, signOutComponent] =
      wrapper.dive().find('.navbar-nav')
      .find(NavItem);
      expect(signOutComponent.props.to).toEqual('/');

      logOut.mockClear();
      logOut.mockImplementation(() => {
        return jest.fn();
      });
      //<withRouter(NavItem) onClick={[Function anonymous]} to="/">Sign Out</withRouter(NavItem)>
      //signOutComponent.dive().simulate('click');
      signOutComponent.props.onClick();
      expect(logOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('when user is not authenticated', () => {
    test('the sign in <NavItem> is rendered', () => {
      const [,, signInComponent] =
      wrapper.dive().find('.navbar-nav')
      .find(NavItem);
      expect(signInComponent.props.to).toEqual('/login');
    });
  });
});
