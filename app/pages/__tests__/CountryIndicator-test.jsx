import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { browserHistory } from 'react-router';
import configureStore from '../../store/configureStore';

import Page from '../../pages/Page';
import CountryIndicator from '../../pages/CountryIndicator';
import CountryIndicatorContainer from '../../containers/CountryIndicator';
import initialState from '../../tests/helpers/initialState';
import { fetchCountryIndicatorData } from '../../modules/countryIndicators/actions';
import { getIndicatorInfo, getCountryDisplay, getCountryIndicatorDisplay } from '../../modules/countryIndicators/selectors';
import { getCountrySelected, getCountryIndicatorSelected } from '../../modules/masterData/selectors';
import { preloadDynamic, paramsHaveChanged } from '../../utils/preloadDynamic';
import { handleFetchCountryIndicatorData } from '../../modules/countryIndicators/sagas';

jest.mock('../../utils/preloadDynamic');
const mockStore = configureMockStore();

describe('CountryIndicator page', () => {
  let mountedComponent;
  let store;
  const params = {country: 'united-states', indicator: 'gdp'};
  const newParams = {country: 'australia', indicator: 'gdp-qoq'};

  const component = (state = initialState) => {
    if (!mountedComponent) {
      preloadDynamic.mockReset();
      preloadDynamic.mockImplementation(() => {});
      store = mockStore(state);
      mountedComponent = shallow(
        <CountryIndicator
          store={store}
          params={params}
        />
      );
    }
    return mountedComponent;
  };

  describe('mapStateToProps and mapDispatchToProps', () => {
    test('receives countryDisplay from state', () => {
      expect(component().props().countryDisplay)
      .toEqual(getCountryDisplay(initialState));
    });

    test('receives indicatorDisplay from state', () => {
      expect(component().props().indicatorDisplay)
      .toEqual(getCountryIndicatorDisplay(initialState));
    });

    test('receives fetchCountryIndicatorData from dispatch', () => {
      expect(component().props().fetchCountryIndicatorData())
      .toEqual(fetchCountryIndicatorData());
    });
  });

  describe('when country and indicator props are available', () => {
    test('renders the <Page> component with metadata, link and title', () => {
      const pageComponentProps = component().dive().find(Page).props();
      expect(pageComponentProps.meta)
      .toEqual([{
        content: `${getCountryDisplay(initialState)} - ${getCountryIndicatorDisplay(initialState)} data history. No registration, free download to csv.`,
        name: 'description'
      }]);
      expect(pageComponentProps.title)
      .toEqual(`${getCountryDisplay(initialState)} - ${getCountryIndicatorDisplay(initialState)} | EconomicData.co`);
    });

    test('renders the <Page> component with <CountryIndicatorContainer> container', () => {
      const pageComponentProps = component().dive().find(Page).props();
      expect(pageComponentProps.children.type).toEqual(CountryIndicatorContainer);
    });
  });

  describe('when country or indicator props are not available', () => {
    const initialStateWithNoIndicatorSelected = {
      ...initialState,
      countryIndicator: {
        ...initialState.countryIndicator,
        indicatorInfo: {}
      }
    };
    beforeEach(() => {
      mountedComponent = null;
    });

    test('renders an empty <div />', () => {
      const rendered = component(initialStateWithNoIndicatorSelected).dive();
      expect(rendered.length).toEqual(1);
      expect(rendered.first().type()).toEqual('div');
    });
  });

  describe('componentWillMount()', () => {
    test('calls fetchCountryIndicatorData with params', () => {
      expect(preloadDynamic).toHaveBeenCalledTimes(1);
      const mockCalled = preloadDynamic.mock.calls[0][0][0];
      expect(mockCalled.action(mockCalled.args))
      .toEqual({
        type: fetchCountryIndicatorData().type,
        payload: params
      });
    });
  });

  describe('componentWillReceiveProps()', () => {
    describe('when params have changed', () => {
      test('calls fetchCountryIndicatorData with params', () => {
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
      country: 'australia',
      indicator: 'gdp-qoq'
    };
    expect(CountryIndicator.preloadStatic(payload))
    .toEqual([
      [handleFetchCountryIndicatorData, {payload}]
    ]);
  });
});
