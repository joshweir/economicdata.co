import React from 'react';
import { mount, shallow } from 'enzyme';
import Select from 'react-select';
import CountryIndicatorSelection
  from '../../components/CountryIndicatorSelection';

describe('<CountryIndicatorSelection />', () => {
  let props;
  let mountedComponent;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <CountryIndicatorSelection {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      country: 'united-states',
      countries: [
        {
          label: 'United States',
          value: 'united-states'
        },
        {
          label: 'Australia',
          value: 'australia'
        }
      ],
      countryIndicator: 'gdp',
      countryIndicators: [
        {
          label: 'GDP',
          value: 'gdp'
        },
        {
          label: 'CPI',
          value: 'cpi'
        }
      ],
      changeCountry: () => {},
      changeCountryIndicator: () => {}
    };
    mountedComponent = undefined;
  });

  test('renders the country <Select> with props', () => {
    const [firstSelect] = component().find(Select);
    const componentProps = firstSelect.props;
    expect(componentProps.options).toBe(props.countries);
    expect(componentProps.value).toBe(props.country);
    expect(componentProps.onChange).toBe(props.changeCountry);
  });

  test('renders the country indicator <Select> with props', () => {
    const [, secondSelect] = component().find(Select);
    const componentProps = secondSelect.props;
    expect(componentProps.options).toBe(props.countryIndicators);
    expect(componentProps.value).toBe(props.countryIndicator);
    expect(componentProps.onChange).toBe(props.changeCountryIndicator);
  });
});
