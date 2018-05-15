import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CountryIndicator from '../../containers/CountryIndicator';
import CountryIndicatorSelection from '../../components/CountryIndicatorSelection';
import CountryIndicatorInfo from '../../components/CountryIndicatorInfo';
import CountryIndicatorData from '../../components/CountryIndicatorData';
import initialState from '../../tests/helpers/initialState';
import { getCountryIndicatorsForSelect, getCountriesForSelect,
  getCountrySelected, getCountryIndicatorSelected } from '../../modules/masterData/selectors';
import { getIndicatorData, getIndicatorInfo,
  getMoreToLoad, getCountry,
  getCountryIndicator } from '../../modules/countryIndicators/selectors';
import { fetchCountryIndicators } from '../../modules/masterData/actions';
import { fetchCountryIndicatorData,
  loadMoreIndicatorData } from '../../modules/countryIndicators/actions';

const mockStore = configureMockStore();

describe('<CountryIndicator />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <CountryIndicator store={store} />
    );
  });

  describe('mapStateToProps and mapDispatchToProps', () => {
    test('receives countrySelectedIndicators from state', () => {
      expect(wrapper.props().countrySelectedIndicators)
      .toEqual(getCountryIndicatorsForSelect(initialState));
    });

    test('receives countrySelected from state', () => {
      expect(wrapper.props().countrySelected)
      .toEqual(getCountrySelected(initialState));
    });

    test('receives countryIndicatorSelected from state', () => {
      expect(wrapper.props().countryIndicatorSelected)
      .toEqual(getCountryIndicatorSelected(initialState));
    });

    test('receives country from state', () => {
      expect(wrapper.props().country)
      .toEqual(getCountry(initialState));
    });

    test('receives countryIndicator from state', () => {
      expect(wrapper.props().countryIndicator)
      .toEqual(getCountryIndicator(initialState));
    });

    test('receives indicatorInfo from state', () => {
      expect(wrapper.props().indicatorInfo)
      .toEqual(getIndicatorInfo(initialState));
    });

    test('receives indicatorData from state', () => {
      expect(wrapper.props().indicatorData)
      .toEqual(getIndicatorData(initialState));
    });

    test('receives countries from state', () => {
      expect(wrapper.props().countries)
      .toEqual(getCountriesForSelect(initialState));
    });

    test('receives moreToLoad from state', () => {
      expect(wrapper.props().moreToLoad)
      .toEqual(getMoreToLoad(initialState));
    });

    test('receives fetchCountryIndicators from dispatch', () => {
      expect(wrapper.props().fetchCountryIndicators())
      .toEqual(fetchCountryIndicators());
    });

    test('receives fetchCountryIndicatorData from dispatch', () => {
      expect(wrapper.props().fetchCountryIndicatorData())
      .toEqual(fetchCountryIndicatorData());
    });

    test('receives loadMoreIndicatorData from dispatch', () => {
      expect(wrapper.props().loadMoreIndicatorData())
      .toEqual(loadMoreIndicatorData());
    });
  });

  test('renders <CountryIndicatorSelection> with props', () => {
    const subComponentProps =
    wrapper.dive().find(CountryIndicatorSelection).props();
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

  test('renders <CountryIndicatorInfo> with props', () => {
    const subComponentProps =
    wrapper.dive().find(CountryIndicatorInfo).props();
    expect(subComponentProps.indicatorInfo)
    .toEqual(getIndicatorInfo(initialState));
    expect(subComponentProps.indicatorData)
    .toEqual(getIndicatorData(initialState));
  });

  test('renders <CountryIndicatorData> with props', () => {
    const subComponentProps =
    wrapper.dive().find(CountryIndicatorData).props();
    expect(subComponentProps.indicatorData)
    .toEqual(getIndicatorData(initialState));
    expect(subComponentProps.country)
    .toEqual(getCountry(initialState));
    expect(subComponentProps.countryIndicator)
    .toEqual(getCountryIndicator(initialState));
    expect(subComponentProps.moreToLoad)
    .toEqual(getMoreToLoad(initialState));
    expect(subComponentProps.onLoadMore())
    .toEqual(loadMoreIndicatorData());
  });
});
