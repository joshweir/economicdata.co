import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router';
import Footer
  from '../../components/Footer';

describe('<Footer />', () => {
  let props;
  let mountedComponent;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <Footer {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {};
    mountedComponent = undefined;
  });

  test('renders the about and contact <Link>', () => {
    const [aboutLink, contactLink] = component().find(Link);
    expect(aboutLink.props.to).toBe('/about');
    expect(contactLink.props.to).toBe('/contact-us');
  });
});
