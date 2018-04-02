import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import CountryIndicatorInfo from '../../components/CountryIndicatorInfo';
import CountryIndicatorLatestRelease from '../../components/CountryIndicatorLatestRelease';
import CountryIndicatorBio from '../../components/CountryIndicatorBio';

describe('<CountryIndicatorInfo />', () => {
  let props;
  let mountedComponent;
  const component = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <CountryIndicatorInfo {...props} />
      );
    }
    return mountedComponent;
  }

  beforeEach(() => {
    props = {
      indicatorInfo: {
        country: 'united-states',
        countryDisplay: 'United States',
        indicator: 'gdp',
        indicatorDisplay: 'GDP',
        importance: 'high',
        source: 'the source',
        description: '<p>The <strong>description</strong></p>'
      },
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
      ]
    };
    mountedComponent = undefined;
  });

  it('renders a h1 with country and indicator', () => {
    expect(component().find('h1').first().text())
      .toBe('United States - GDP');
  });

  it('renders a <CountryIndicatorLatestRelease> with first indicatorData element', () => {
    const [latest] = props.indicatorData;
    expect(component().find(CountryIndicatorLatestRelease).first().props().data)
      .toBe(latest);
  });

  it('renders a <CountryIndicatorBio> with indicatorInfo', () => {
    expect(component().find(CountryIndicatorBio).first().props().data)
      .toBe(props.indicatorInfo);
  });

  it('renders the country indicator description with indicatorInfo.description', () => {
    expect(component().find('.desc').first().html())
      .toBe('<div class="desc"><p>The description</p></div>');
  });
});
