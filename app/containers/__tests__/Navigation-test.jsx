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

      const subComponentProps = asdf.props();
      expect(subComponentProps.country)
      .toEqual(getCountrySelected(initialState));
      expect(subComponentProps.countries)
      .toEqual(getCountriesForSelect(initialState));
      expect(subComponentProps.countryIndicator)
      .toEqual(getCountryIndicatorSelected(initialState));
      expect(subComponentProps.countryIndicators)
      .toEqual(getCountryIndicatorsForSelect(initialState));
      expect(wrapper.dive().find(CountryIndicatorSelection).props().changeCountry())
      .toEqual(fetchCountryIndicators());
      expect(
        wrapper.dive().find(CountryIndicatorSelection)
        .props().changeCountryIndicator()
      ).toEqual(fetchCountryIndicatorData());
    });
  });

  test('renders <CountryIndicatorInfo> with props', () => {
    const subComponentProps =
    wrapper.dive().find(CountryIndicatorInfo).props();
    expect(subComponentProps.indicatorInfo)
    .toEqual(getIndicatorInfo(initialState));
    expect(subComponentProps.indicatorData)
    .toEqual(getIndicatorData(initialState));
  });
});
