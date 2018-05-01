import Index from '../client';

test('renders without crashing', () => {
  // expect(Object.assign({}, Index, { _reactInternalInstance: 'censored' })).toEqual(null);
  expect(JSON.stringify(
    Object.assign({}, Index, { _reactInternalInstance: 'censored' })
  )).toMatchSnapshot();
});
