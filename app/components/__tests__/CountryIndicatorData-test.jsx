import React from 'react';
import { shallow } from 'enzyme';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CountryIndicatorData from '../../components/CountryIndicatorData';

describe('<CountryIndicatorData />', () => {
  let props;
  let mountedComponent;
  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <CountryIndicatorData {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      indicatorData: [
        {
          releaseDate: 'Mar 30, 2018',
          actual: '0.8%',
          forecast: '0.9%',
          previous: '0.7%'
        },
        {
          releaseDate: 'Feb 28, 2018',
          actual: '0.1%',
          forecast: '0.2%',
          previous: '0.3%'
        },
      ],
      onDownloadCSV: jest.fn(),
      onLoadMore: jest.fn()
    };
    mountedComponent = undefined;
  });

  test('renders a <BootstrapTable> with props', () => {
      expect(component().find(BootstrapTable).first().props().data)
        .toBe(props.indicatorData);
  });

  test('renders <TableHeaderColumn>s as children to <BootstrapTable>', () => {

  });
});
