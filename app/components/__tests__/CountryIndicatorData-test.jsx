import React from 'react';
import { shallow } from 'enzyme';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CountryIndicatorData from '../../components/CountryIndicatorData';

describe('<CountryIndicatorData />', () => {
  let props = {
    indicatorData: [
      {
        releaseDate: 'Mar 30, 2018',
        time: '05:00',
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
    country: 'united-states',
    countryIndicator: 'gdp',
    onLoadMore: jest.fn(),
    moreToLoad: true
  };
  let mountedComponent;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <CountryIndicatorData {...props} />
      );
    }
    return mountedComponent;
  };

  test('renders a <BootstrapTable> with props', () => {
    expect(component().find(BootstrapTable).first().props().data)
      .toBe(props.indicatorData);
  });

  test('renders <TableHeaderColumn>s as children to <BootstrapTable>', () => {
    const [
      releaseDateCol, timeCol, actualCol, forecastCol, prevCol
    ] = component().find(BootstrapTable).first().props().children;
    expect(releaseDateCol.props.dataField).toEqual('releaseDate');
    expect(releaseDateCol.props.columnClassName).toEqual('f r');
    expect(releaseDateCol.type).toEqual(TableHeaderColumn);
    expect(timeCol.props.dataField).toEqual('time');
    expect(timeCol.props.columnClassName).toEqual('d-none d-md-block');
    expect(timeCol.type).toEqual(TableHeaderColumn);
    expect(actualCol.props.dataField).toEqual('actual');
    expect(actualCol.props.columnClassName).toEqual('val-col');
    expect(actualCol.type).toEqual(TableHeaderColumn);
    expect(forecastCol.props.dataField).toEqual('forecast');
    expect(forecastCol.props.columnClassName).toEqual('val-col');
    expect(forecastCol.type).toEqual(TableHeaderColumn);
    expect(prevCol.props.dataField).toEqual('previous');
    expect(prevCol.props.columnClassName).toEqual('val-col l');
    expect(prevCol.type).toEqual(TableHeaderColumn);
  });

  describe('when moreToLoad prop is true', () => {
    test('renders the load more button', () => {
      expect(component().find('.load-more').length).toEqual(1);
    });

    test('triggers onLoadMore function when clicked', () => {
      props.onLoadMore.mockReset();
      component().find('.load-more').prop('onClick')();
      expect(props.onLoadMore).toHaveBeenCalledTimes(1);
    });
  });

  describe('when moreToLoad prop is false', () => {
    test('does not render the load more button', () => {
      mountedComponent = null;
      props = {
        ...props, moreToLoad: false
      };
      expect(component().find('.load-more').length).toEqual(0);
    });
  });

  test('renders the download to csv anchor with href referencing the current ' +
    'country / indicator',
  () => {
    const theButton = component().find('.dl-csv').first();
    expect(theButton.props().href)
    .toEqual(`/download?country=${props.country}&` +
      `indicator=${props.countryIndicator}`);
  });
});
