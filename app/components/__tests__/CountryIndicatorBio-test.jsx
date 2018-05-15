import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router';
import CountryIndicatorBio from '../../components/CountryIndicatorBio';

describe('<CountryIndicatorBio />', () => {
  let props;
  let mountedComponent;
  const component = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <CountryIndicatorBio {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      data: {
        country: 'united-states',
        countryDisplay: 'United States',
        indicator: 'gdp',
        indicatorDisplay: 'GDP',
        importance: 'high',
        source: '<a href="a-link" onClick="evil()" target="_blank">The Source</a>',
        description: '<p>The description</p>'
      }
    };
    mountedComponent = undefined;
  });

  test('renders the importance based on data prop', () => {
    const { importance } = props.data;
    const importanceDiv = component().find(`.info .${importance}`);
    expect(importanceDiv.length).toBe(1);
    expect(importanceDiv.find('i').first().prop('title'))
      .toBe('High Importance');
  });

  test('renders the country link', () => {
    const countryLink = component().find('.info').find(Link).first();
    expect(countryLink.prop('to')).toBe('/data/united-states');
    expect(countryLink.text()).toBe('United States');
  });

  test('renders the source (sanitized html)', () => {
    expect(component().find('.source').first().html())
      .toBe('<span class="source"><a href="a-link" target="_blank">The Source</a></span>');
  });
});
