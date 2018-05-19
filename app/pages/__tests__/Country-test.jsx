import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { browserHistory } from 'react-router';
import configureStore from '../../store/configureStore';

import Page from '../../pages/Page';
import Country from '../../pages/Country';
import CountryContainer from '../../containers/Country';
import initialState from '../../tests/helpers/initialState';
import { fetchCountryData } from '../../modules/country/actions';
import { getCountry, getCountryDisplay } from '../../modules/country/selectors';
import { preloadDynamic, paramsHaveChanged } from '../../utils/preloadDynamic';
import { handleFetchCountryData } from '../../modules/country/sagas';

jest.mock('../../utils/preloadDynamic');
const mockStore = configureMockStore();

describe('Country page', () => {
  let mountedComponent;
  let store;
  const params = {country: 'united-states'};
  const newParams = {country: 'australia'};

  const component = (state = initialState) => {
    if (!mountedComponent) {
      preloadDynamic.mockReset();
      preloadDynamic.mockImplementation(() => {});
      store = mockStore(state);
      mountedComponent = shallow(
        <Country
          store={store}
          params={params}
        />
      );
    }
    return mountedComponent;
  };

  describe('mapStateToProps and mapDispatchToProps', () => {
    test('receives country from state', () => {
      expect(component().props().country)
      .toEqual(getCountry(initialState));
    });

    test('receives countryDisplay from state', () => {
      expect(component().props().countryDisplay)
      .toEqual(getCountryDisplay(initialState));
    });

    test('receives fetchCountryData from dispatch', () => {
      expect(component().props().fetchCountryData())
      .toEqual(fetchCountryData());
    });
  });

  describe('when country prop is available', () => {
    test('renders the <Page> component with metadata, link and title', () => {
      const pageComponentProps = component().dive().find(Page).props();
      expect(pageComponentProps.meta)
      .toEqual([{
        content: `${getCountryDisplay(initialState)} indicators. No registration, free download to csv.`,
        name: 'description'
      }]);
      expect(pageComponentProps.title)
      .toEqual(`${getCountryDisplay(initialState)} Indicators | EconomicData.co`);
    });

    test('renders the <Page> component with <CountryContainer> container', () => {
      const pageComponentProps = component().dive().find(Page).props();
      expect(pageComponentProps.children.type).toEqual(CountryContainer);
    });
  });

  describe('when country prop is not available', () => {
    const initialStateWithNoCountry = {
      ...initialState,
      country: {}
    };
    beforeEach(() => {
      mountedComponent = null;
    });

    test('renders an empty <div />', () => {
      const rendered = component(initialStateWithNoCountry).dive();
      expect(rendered.length).toEqual(1);
      expect(rendered.first().type()).toEqual('div');
    });
  });

  describe('componentWillMount()', () => {
    test('calls fetchCountryData with params', () => {
      expect(preloadDynamic).toHaveBeenCalledTimes(1);
      const mockCalled = preloadDynamic.mock.calls[0][0][0];
      expect(mockCalled.action(mockCalled.args))
      .toEqual({
        type: fetchCountryData().type,
        payload: params
      });
    });
  });

  describe('componentWillReceiveProps()', () => {
    describe('when params have changed', () => {
      test('calls fetchCountryData with params', () => {
        // TODO: Determine how to test commponentWillReceiveProps on connected component.
        /*
        preloadDynamic.mockReset();
        store = configureStore(initialState, browserHistory);
        let wrapped = shallow(
          <CountryIndicator
            store={store}
            params={params}
          />
        );

        // wrapped.setProps({params: newParams});

        // const wrapped = component();
        // wrapped = wrapped.instance();
        // expect(wrapped).toEqual(null);
        wrapped = wrapped.dive();
        // wrapped.componentWillReceiveProps({params: newParams});
        wrapped.setProps({params: newParams});
        // wrapped.instance().forceUpdate();
        // wrapped.update();
        console.log('another!!', wrapped.props());
        expect(wrapped.props().params).toEqual(newParams);
        expect(preloadDynamic).toHaveBeenCalledTimes(1);
        const mockCalled = preloadDynamic.mock.calls[0][0][0];
        expect(mockCalled.action(mockCalled.args))
        .toEqual({
          type: fetchCountryIndicatorData().type,
          payload: newParams
        });
        done();
        */
      });
    });

    describe('when params have not changed', () => {
      // TODO: Determine how to test commponentWillReceiveProps on connected component.
    });
  });

  describe('preloadStatic()', () => {
    const payload = {
      country: 'australia'
    };
    expect(Country.preloadStatic(payload))
    .toEqual([
      [handleFetchCountryData, {payload}]
    ]);
  });
});
