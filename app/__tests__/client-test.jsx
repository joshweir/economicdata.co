import Index from '../client';
import initialState from '../tests/helpers/initialState';

describe('client.jsx', () => {
  let renderedClient;
  let props;

  const rendered = (state = initialState) => {
    if (!renderedClient) {
      global.window.__INITIAL_STATE__ = state;
      renderedClient = Object.assign(
        {}, Index, { _reactInternalInstance: 'censored' });
    }
    return renderedClient;
  };

  test('renders without crashing', () => {
    // expect(Object.assign({}, Index, { _reactInternalInstance: 'censored' })).toEqual(null);
    expect(JSON.stringify(
      rendered()
    )).toMatchSnapshot();
  });

  test('renders <Provider> passing store as props', () => {

  });
});
