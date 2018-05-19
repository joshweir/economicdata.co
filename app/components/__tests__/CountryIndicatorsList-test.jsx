import React from 'react';
import { mount } from 'enzyme';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CountryIndicatorsList from '../../components/CountryIndicatorsList';

describe('<CountryIndicatorsList />', () => {
  let props;
  let mountedComponent;

  const component = () => {
    if (!mountedComponent) {
      props = {
        countryIndicators: [
          {
            valueLabelAndCountry: 'gdp|GDP|united-states',
            lastReleaseDate: 'Mar 30, 2018',
            lastActual: '0.8%',
            lastPrevious: '0.7%'
          },
          {
            valueLabelAndCountry: 'cpi|CPI|united-states',
            lastReleaseDate: 'Feb 28, 2018',
            lastActual: '0.1%',
            lastPrevious: '0.3%'
          },
        ],
        buildIndicatorLink: jest.fn()
      };
      mountedComponent = mount(
        <CountryIndicatorsList {...props} />
      );
    }
    return mountedComponent;
  };

  test('renders a <BootstrapTable> with props', () => {
    expect(component().find(BootstrapTable).first().props().data)
      .toBe(props.countryIndicators);
  });

  test('renders <TableHeaderColumn>s as children to <BootstrapTable>', () => {
    const [
      valueLabelAndCountryCol, lastActualCol, lastReleaseDateCol, lastPrevCol
    ] = component().find(BootstrapTable).first().props().children;
    expect(valueLabelAndCountryCol.props.dataField).toEqual('valueLabelAndCountry');
    expect(valueLabelAndCountryCol.props.columnClassName).toEqual('f r');
    expect(valueLabelAndCountryCol.type).toEqual(TableHeaderColumn);
    expect(lastActualCol.props.dataField).toEqual('lastActual');
    expect(lastActualCol.props.columnClassName).toEqual('val-col');
    expect(lastActualCol.type).toEqual(TableHeaderColumn);
    expect(lastReleaseDateCol.props.dataField).toEqual('lastReleaseDate');
    expect(lastReleaseDateCol.props.columnClassName).toEqual('val-col');
    expect(lastReleaseDateCol.type).toEqual(TableHeaderColumn);
    expect(lastPrevCol.props.dataField).toEqual('lastPrevious');
    expect(lastPrevCol.props.columnClassName).toEqual('val-col l');
    expect(lastPrevCol.type).toEqual(TableHeaderColumn);
  });

  test('calls dataFormat to build an indicator link for each row', () => {
    const { countryIndicators, buildIndicatorLink } = props;
    countryIndicators.forEach((_, i) => {
      expect(buildIndicatorLink.mock.calls[i][0])
      .toEqual(countryIndicators[i].valueLabelAndCountry);
    });
  });
});
