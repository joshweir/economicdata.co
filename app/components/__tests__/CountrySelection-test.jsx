import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import CountrySelection
  from '../../components/CountrySelection';

describe('<CountrySelection />', () => {
  let props;
  let mountedComponent;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <CountrySelection {...props} />
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
      changeCountry: () => {}
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
});
