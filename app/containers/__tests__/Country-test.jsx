import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Country from '../../containers/Country';
import CountrySelection from '../../components/CountrySelection';
import CountryIndicatorsList from '../../components/CountryIndicatorsList';
import initialState from '../../tests/helpers/initialState';
import { getCountriesForSelect } from '../../modules/masterData/selectors';
import { getCountry, getCountryIndicators,
  getCountryDisplay } from '../../modules/country/selectors';
import { fetchCountryData, buildIndicatorLink } from '../../modules/country/actions';

const mockStore = configureMockStore();

describe('<Country />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Country store={store} />
    );
  });

  describe('mapStateToProps and mapDispatchToProps', () => {
    test('receives countrySelectedIndicators from state', () => {
      expect(wrapper.props().countrySelectedIndicators)
      .toEqual(getCountryIndicators(initialState));
    });

    test('receives country from state', () => {
      expect(wrapper.props().country)
      .toEqual(getCountry(initialState));
    });

    test('receives countryDisplay from state', () => {
      expect(wrapper.props().countryDisplay)
      .toEqual(getCountryDisplay(initialState));
    });

    test('receives countries from state', () => {
      expect(wrapper.props().countries)
      .toEqual(getCountriesForSelect(initialState));
    });

    test('receives fetchCountryData from dispatch', () => {
      expect(wrapper.props().fetchCountryData())
      .toEqual(fetchCountryData());
    });

    test('receives buildIndicatorLink from dispatch', () => {
      const input = 'gdp|GDP|united-states';
      expect(wrapper.props().buildIndicatorLink(input))
      .toEqual(buildIndicatorLink(input));
    });
  });

  test('renders the <h1>', () => {
    expect(wrapper.dive().find('h1').text())
    .toEqual('United States - Economic Data');
  });

  test('renders <CountrySelection> with props', () => {
    const subComponentProps =
    wrapper.dive().find(CountrySelection).props();
    expect(subComponentProps.country)
    .toEqual(getCountry(initialState));
    expect(subComponentProps.countries)
    .toEqual(getCountriesForSelect(initialState));
    expect(subComponentProps.changeCountry())
    .toEqual(fetchCountryData());
  });

  test('renders <CountryIndicatorsList> with props', () => {
    const input = 'gdp|GDP|united-states';
    const subComponentProps =
    wrapper.dive().find(CountryIndicatorsList).props();
    expect(subComponentProps.countryIndicators)
    .toEqual(getCountryIndicators(initialState));
    expect(subComponentProps.buildIndicatorLink(input))
    .toEqual(buildIndicatorLink(input));
  });
});
