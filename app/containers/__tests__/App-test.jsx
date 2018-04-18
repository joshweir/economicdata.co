import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Navigation from '../Navigation';
import Message from '../Message';
import Footer from '../../components/Footer';

describe('<App />', () => {
  let wrapper;
  let children;

  beforeEach(() => {
    children = <div className="test-child" />;
    wrapper = shallow(<App>{children}</App>);
  });

  test('renders (in order) <Navigation>, <Message>, children, <Footer>', () => {
    const expected = [
      <Navigation />,
      <Message />,
      children,
      <Footer />
    ];
    expect(wrapper.children().map(child => child.node))
    .toEqual(expected);
  });
});
