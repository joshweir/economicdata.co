import React from 'react';
import { mount } from 'enzyme';
import CountryIndicatorLatestRelease from '../../components/CountryIndicatorLatestRelease';

describe('<CountryIndicatorLatestRelease />', () => {
  let props;
  let mountedComponent;
  const component = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <CountryIndicatorLatestRelease {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      data: {
        releaseDate: 'Mar 30, 2018',
        actual: '0.8%',
        forecast: '0.9%',
        previous: '0.7%'
      }
    };
    mountedComponent = undefined;
  });

  test('renders the releaseDate', () => {
    expect(component().find('.rel-dt .v').text())
      .toBe(props.data.releaseDate);
  });

  test('renders the actual', () => {
    expect(component().find('.rel-a .v').text())
      .toBe(props.data.actual);
  });

  describe('With forecast and previous data points', () => {
    test('renders the forecast', () => {
      expect(component().find('.rel-f .v').text())
        .toBe(props.data.forecast);
    });

    test('renders the previous', () => {
      expect(component().find('.rel-p .v').text())
        .toBe(props.data.previous);
    });
  });

  describe('Without forecast and previous data points', () => {
    beforeEach(() => {
      props = {
        data: {
          releaseDate: 'Mar 30, 2018',
          actual: '0.8%'
        }
      };
    });

    test('renders the forecast', () => {
      expect(component().find('.rel-f .v').text())
        .toBe('');
    });

    test('renders the previous', () => {
      expect(component().find('.rel-p .v').text())
        .toBe('');
    });
  });
});
